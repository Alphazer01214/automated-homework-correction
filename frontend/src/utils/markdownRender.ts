// markdownRenderer.ts
import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface MarkdownParserOptions {
  /** 是否启用数学公式支持 */
  enableMath: boolean;
  /** 是否启用代码高亮 (本示例未实现具体高亮逻辑，保留接口) */
  enableHighlight: boolean;
  /** 其他 Marked 选项 */
  markedOptions?: marked.MarkedOptions;
}

export class MarkdownMathParser {
  private options: MarkdownParserOptions;

  constructor(options: Partial<MarkdownParserOptions> = {}) {
    this.options = {
      enableMath: true,
      enableHighlight: false,
      ...options
    };

    this.configureMarked();
  }

  private configureMarked() {
    // 1. 初始化 Marked 实例
    // 注意：这里不再 new marked.Renderer()，而是通过 marked.use 添加扩展

    // 2. 如果启用数学公式，注册扩展
    if (this.options.enableMath) {
      this.registerMathExtension();
    }

    // 3. 配置基本选项
    marked.setOptions({
      breaks: true,
      gfm: true,
      ...this.options.markedOptions
    });
  }

  /**
   * 使用 Marked Extension 机制注册数学公式解析器
   * 这是解决 LaTeX 语法被 Markdown 破坏的关键
   */
  private registerMathExtension() {
    const mathExtension = {
      name: 'math',
      level: 'inline', // 这里设为 inline，但通过 start 函数控制它是否可以作为块级
      start(src: string) {
        // 告诉 marked 从哪里开始尝试匹配（优化性能）
        // 匹配 $, $$, \(, \[
        return src.match(/\$|\\\(|\\\[/);
      },
      tokenizer(src: string, tokens: any) {
        // --- 1. 块级公式 Block Math ($$ ... $$) ---
        const blockRule = /^\$\$([\s\S]+?)\$\$/;
        const blockMatch = blockRule.exec(src);
        if (blockMatch) {
          return {
            type: 'math',
            raw: blockMatch[0],
            text: blockMatch[1].trim(),
            displayMode: true
          };
        }

        // --- 2. 块级公式 Block Math (\[ ... \]) ---
        const latexBlockRule = /^\\\[([\s\S]+?)\\\]/;
        const latexBlockMatch = latexBlockRule.exec(src);
        if (latexBlockMatch) {
          return {
            type: 'math',
            raw: latexBlockMatch[0],
            text: latexBlockMatch[1].trim(),
            displayMode: true
          };
        }

        // --- 3. 内联公式 Inline Math ($ ... $) ---
        // 注意：排除转义的 \$
        const inlineRule = /^\$([^$\n]+?)\$/;
        const inlineMatch = inlineRule.exec(src);
        if (inlineMatch) {
          return {
            type: 'math',
            raw: inlineMatch[0],
            text: inlineMatch[1].trim(),
            displayMode: false
          };
        }

        // --- 4. 内联公式 Inline Math (\( ... \)) ---
        const latexInlineRule = /^\\\(([\s\S]+?)\\\)/;
        const latexInlineMatch = latexInlineRule.exec(src);
        if (latexInlineMatch) {
          return {
            type: 'math',
            raw: latexInlineMatch[0],
            text: latexInlineMatch[1].trim(),
            displayMode: false
          };
        }

        return undefined; // 没匹配到
      },
      renderer(token: any) {
        try {
          return katex.renderToString(token.text, {
            throwOnError: false,
            displayMode: token.displayMode,
            output: 'html', // 输出 html
            strict: false
          });
        } catch (error) {
          console.warn('KaTeX Render Error:', error);
          return token.raw; // 渲染失败回退到源码
        }
      }
    };

    // 强制类型转换，因为 Marked 的 TS 定义可能不完全匹配自定义扩展
    marked.use({ extensions: [mathExtension as any] });
  }

  /**
   * 解析 Markdown 并渲染为 HTML
   */
  async parse(markdown: string): Promise<string> {
    try {
      // 在新版 marked 中，parse 返回可能是 Promise 也可能是 string
      // 这里统一 await 处理
      return await marked.parse(markdown);
    } catch (error) {
      console.error('Markdown 解析错误:', error);
      return `<div class="markdown-error">解析错误: ${error}</div>`;
    }
  }

  /**
   * 同步解析 Markdown
   */
  parseSync(markdown: string): string {
    try {
      // marked.parse 在未启用 async 选项时默认是同步的，但 TS 签名可能是 Promise
      // 如果确信是同步，可以直接断言，或者使用 marked.parseInline (但不推荐用于整文)
      const result = marked.parse(markdown);
      if (result instanceof Promise) {
        throw new Error("Marked is running in async mode, use parse() instead.");
      }
      return result as string;
    } catch (error) {
      console.error('Markdown 解析错误:', error);
      return `<div class="markdown-error">解析错误: ${error}</div>`;
    }
  }

  /**
   * 渲染到 DOM 元素
   */
  async renderToElement(element: HTMLElement, markdown: string): Promise<void> {
    const html = await this.parse(markdown);
    element.innerHTML = html;
  }

  /**
   * 渲染到指定 ID 的元素
   */
  async renderToElementId(elementId: string, markdown: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (element) {
      await this.renderToElement(element, markdown);
    } else {
      console.error(`元素 #${elementId} 未找到`);
    }
  }
}
