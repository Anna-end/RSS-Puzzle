import styles from './DragDrop.module.css';

type DragEventHandler = (this: HTMLElement, e: DragEvent) => void;

export function addDragDropLogic(): void {
  let draggedElement: HTMLElement | null = null;

  const dragStart: DragEventHandler = function (this: HTMLElement, e: DragEvent) {
    this.classList.add(styles.hold);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    draggedElement = this;

    const dragData = this.getAttribute('datadrag');
    if (dragData && e.dataTransfer) {
      e.dataTransfer.setData('text/plain', dragData);
    }

    setTimeout(() => {
      this.classList.add(styles.hidden);
    }, 0);
  };

  const dragEnd: DragEventHandler = function (this: HTMLElement) {
    this.classList.remove(styles.hold);
    this.classList.remove(styles.hidden);
    draggedElement = null;
  };

  const dragEnter: DragEventHandler = function (this: HTMLElement, e: DragEvent) {
    e.preventDefault();

    // Если в контейнере уже есть элемент, блокируем дроп
    const hasChild = this.children.length > 0 && !this.classList.contains(styles.dragElement);
    if (hasChild) {
      this.classList.add(styles.disabled);
      return;
    }

    this.classList.add(styles.hovered);
  };

  const dragLeave: DragEventHandler = function (this: HTMLElement) {
    this.classList.remove(styles.hovered);
    this.classList.remove(styles.disabled);
  };

  const dragOver: DragEventHandler = function (this: HTMLElement, e: DragEvent) {
    e.preventDefault();

    const hasChild = this.children.length > 0 && !this.classList.contains(styles.dragElement);
    if (hasChild) {
      e.dataTransfer!.dropEffect = 'none';
      return;
    }

    e.dataTransfer!.dropEffect = 'move';
  };

  const drop: DragEventHandler = function (this: HTMLElement, e: DragEvent) {
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

    setTimeout(() => {
      this.classList.remove(styles.drop);
    }, 300);
  };

  const dragElements: NodeListOf<HTMLElement> =
    document.querySelectorAll<HTMLElement>('[datadrag]');

  const dragContainer: NodeListOf<HTMLElement> =
    document.querySelectorAll<HTMLElement>('[data="drag-container"]');

  for (const dragElem of dragElements) {
    dragElem.setAttribute('draggable', 'true');
    dragElem.addEventListener('dragstart', dragStart as EventListener);
    dragElem.addEventListener('dragend', dragEnd as EventListener);
    dragElem.classList.add(styles.dragElement);

    const numberSentense = dragElem.getAttribute('datadrag');
    if (numberSentense) {
      const dropElements: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(
        `[datadrop="${numberSentense}"]`
      );
      for (const container of dragContainer) {
        container.setAttribute('droppable', 'true');
        container.addEventListener('dragenter', dragEnter as EventListener);
        container.addEventListener('dragleave', dragLeave as EventListener);
        container.addEventListener('dragover', dragOver as EventListener);
        container.addEventListener('drop', drop as EventListener);

        if (container.children.length === 0) {
          container.classList.add(styles.initial);
        }
      }
      for (const dropElement of dropElements) {
        dropElement.setAttribute('droppable', 'true');
        dropElement.addEventListener('dragenter', dragEnter as EventListener);
        dropElement.addEventListener('dragleave', dragLeave as EventListener);
        dropElement.addEventListener('dragover', dragOver as EventListener);
        dropElement.addEventListener('drop', drop as EventListener);

        if (dropElement.children.length === 0) {
          dropElement.classList.add(styles.initial);
        }
      }
    }
  }
}
