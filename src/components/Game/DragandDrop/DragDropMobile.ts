import styles from './DragDrop.module.css';

type TouchEventHandler = (this: HTMLElement, e: TouchEvent) => void;

export function addDragDropLogicMobile(numberSentense: number): void {
  let draggedElement: HTMLElement | null = null;
  let touchStartX = 0;
  let touchStartY = 0;
  let dragClone: HTMLElement | null = null;

  const touchStart: TouchEventHandler = function (this: HTMLElement, e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];

    this.classList.add(styles.hold);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    draggedElement = this;

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;

    dragClone = this.cloneNode(true) as HTMLElement;
    dragClone.classList.add(styles.dragClone);
    dragClone.style.position = 'fixed';
    dragClone.style.zIndex = '1000';
    dragClone.style.pointerEvents = 'none';

    const rect = this.getBoundingClientRect();
    dragClone.style.width = `${rect.width}px`;
    dragClone.style.height = `${rect.height}px`;
    dragClone.style.left = `${rect.left}px`;
    dragClone.style.top = `${rect.top}px`;

    document.body.appendChild(dragClone);

    setTimeout(() => {
      this.classList.add(styles.hidden);
    }, 0);
  };

  const touchMove = (e: TouchEvent) => {
    if (!draggedElement || !dragClone) return;

    e.preventDefault();
    const touch = e.touches[0];

    dragClone.style.left = `${touch.clientX - dragClone.offsetWidth / 2}px`;
    dragClone.style.top = `${touch.clientY - dragClone.offsetHeight / 2}px`;

    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find(
      (el) =>
        el.hasAttribute('droppable') ||
        el.hasAttribute('data-drag-container') ||
        el.hasAttribute(`datadrop="${numberSentense}`)
    ) as HTMLElement;

    document.querySelectorAll(`.${styles.hovered}`).forEach((el) => {
      el.classList.remove(styles.hovered);
    });

    document.querySelectorAll(`.${styles.disabled}`).forEach((el) => {
      el.classList.remove(styles.disabled);
    });

    if (dropTarget && dropTarget !== draggedElement) {
      const hasChild =
        dropTarget.children.length > 0 && !dropTarget.classList.contains(styles.dragElement);

      if (hasChild) {
        dropTarget.classList.add(styles.disabled);
      } else {
        dropTarget.classList.add(styles.hovered);
      }
    }
  };

  const touchEnd = (e: TouchEvent) => {
    if (!draggedElement) return;

    const touch = e.changedTouches[0];
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const dropTarget = elements.find(
      (el) =>
        el.hasAttribute('droppable') ||
        el.hasAttribute('data-drag-container') ||
        el.hasAttribute(`datadrop="${numberSentense}`)
    ) as HTMLElement;

    const isDrag =
      Math.abs(touch.clientX - touchStartX) > 5 || Math.abs(touch.clientY - touchStartY) > 5;

    if (isDrag && dropTarget && dropTarget !== draggedElement) {
      const hasChild =
        dropTarget.children.length > 0 && !dropTarget.classList.contains(styles.dragElement);

      if (!hasChild) {
        dropTarget.classList.remove(styles.hovered);
        dropTarget.classList.remove(styles.disabled);
        dropTarget.classList.add(styles.drop);
        dropTarget.classList.remove(styles.initial);

        if (draggedElement.parentNode) {
          draggedElement.parentNode.removeChild(draggedElement);
        }
        dropTarget.appendChild(draggedElement);

        draggedElement.setAttribute('data', 'check');

        setTimeout(() => {
          dropTarget.classList.remove(styles.drop);
        }, 300);
      }
    }

    if (draggedElement) {
      draggedElement.classList.remove(styles.hold);
      draggedElement.classList.remove(styles.hidden);
    }

    if (dragClone && dragClone.parentNode) {
      dragClone.parentNode.removeChild(dragClone);
    }

    document.querySelectorAll(`.${styles.hovered}`).forEach((el) => {
      el.classList.remove(styles.hovered);
    });

    document.querySelectorAll(`.${styles.disabled}`).forEach((el) => {
      el.classList.remove(styles.disabled);
    });

    draggedElement = null;
    dragClone = null;

    document.removeEventListener('touchmove', touchMove);
    document.removeEventListener('touchend', touchEnd);
    document.removeEventListener('touchcancel', touchEnd);
  };

  const dragElements: NodeListOf<HTMLElement> =
    document.querySelectorAll<HTMLElement>('[datadrag]');

  const dragContainer: NodeListOf<HTMLElement> =
    document.querySelectorAll<HTMLElement>('[data="drag-container"]');

  for (const dragElem of dragElements) {
    dragElem.addEventListener('touchstart', (e) => {
      const handler = touchStart.bind(dragElem);
      handler(e as TouchEvent);

      document.addEventListener('touchmove', touchMove, { passive: false });
      document.addEventListener('touchend', touchEnd);
      document.addEventListener('touchcancel', touchEnd);
    });

    dragElem.classList.add(styles.dragElement);

    dragElem.setAttribute('draggable', 'true');

    const dropElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(
      `[datadrop="${numberSentense}"]`
    );

    for (const container of dragContainer) {
      container.setAttribute('droppable', 'true');

      container.addEventListener('dragenter', (e) => {
        const handler = function (this: HTMLElement, e: Event) {
          e.preventDefault();
          const hasChild = this.children.length > 0 && !this.classList.contains(styles.dragElement);
          if (hasChild) {
            this.classList.add(styles.disabled);
            return;
          }
          this.classList.add(styles.hovered);
        }.bind(container);
        handler(e);
      });

      container.addEventListener('dragleave', () => {
        const handler = function (this: HTMLElement) {
          this.classList.remove(styles.hovered);
          this.classList.remove(styles.disabled);
        }.bind(container);
        handler();
      });

      container.addEventListener('dragover', (e) => {
        const handler = function (this: HTMLElement, e: Event) {
          e.preventDefault();
          const hasChild = this.children.length > 0 && !this.classList.contains(styles.dragElement);
          if (hasChild) {
            (e as DragEvent).dataTransfer!.dropEffect = 'none';
            return;
          }
          (e as DragEvent).dataTransfer!.dropEffect = 'move';
        }.bind(container);
        handler(e);
      });

      container.addEventListener('drop', (e) => {
        const handler = function (this: HTMLElement, e: Event) {
          e.preventDefault();
          const hasChild = this.children.length > 0 && !this.classList.contains(styles.dragElement);
          if (hasChild || !draggedElement) {
            this.classList.remove(styles.hovered);
            this.classList.remove(styles.disabled);
            return;
          }

          this.classList.remove(styles.hovered);
          this.classList.remove(styles.disabled);
          this.classList.add(styles.drop);
          this.classList.remove(styles.initial);
          this.appendChild(draggedElement);

          const node = this.firstChild;
          if (node && node.nodeType === Node.ELEMENT_NODE) {
            const elem = node as Element;
            elem.setAttribute('data', 'check');
          }
          setTimeout(() => {
            this.classList.remove(styles.drop);
          }, 300);
        }.bind(container);
        handler(e);
      });

      if (container.children.length === 0) {
        container.classList.add(styles.initial);
      }
    }
    for (const dropElement of dropElements) {
      dropElement.setAttribute('droppable', 'true');
      if (dropElement.children.length === 0) {
        dropElement.classList.add(styles.initial);
      }
    }
  }
}
