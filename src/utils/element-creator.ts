export type ElementAttributes = Record<string, string | boolean | number>;
export type ElementChild = string | number | HTMLElement | null;

export class CreatorElement {
  static createElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    options: {
      id?: string;
      classes?: string | string[];
      attributes?: ElementAttributes;
      textContent?: string;
      children?: ElementChild[];
      eventListeners?: Array<{
        type: string;
        listener: EventListener;
        options?: boolean | AddEventListenerOptions;
      }>;
      styles?: Partial<CSSStyleDeclaration>;
    } = {}
  ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tagName);

    if (options.id) {
      element.id = options.id;
    }

    if (options.classes) {
      const classes = Array.isArray(options.classes) ? options.classes : [options.classes];
      element.classList.add(...classes.filter(Boolean));
    }

    if (options.attributes) {
      for (const [key, value] of Object.entries(options.attributes)) {
        if (value === true) {
          element.setAttribute(key, '');
        } else if (value !== false && value !== null && value !== undefined) {
          element.setAttribute(key, String(value));
        }
      }
    }

    if (options.textContent) {
      element.textContent = options.textContent;
    }

    if (options.children) {
      options.children.forEach((child) => {
        if (child === null || child === undefined) return;
        if (typeof child === 'string' || typeof child === 'number') {
          element.appendChild(document.createTextNode(String(child)));
        } else if (child instanceof HTMLElement) {
          element.appendChild(child);
        }
      });
    }

    if (options.eventListeners) {
      options.eventListeners.forEach(({ type, listener, options: listenerOptions }) => {
        element.addEventListener(type, listener, listenerOptions);
      });
    }

    return element;
  }

  static clear(element: HTMLElement): void {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  static remove(element: HTMLElement): void {
    element.remove();
  }
}
