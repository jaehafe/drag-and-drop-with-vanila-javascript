const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

draggables.forEach((draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging');
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

containers.forEach((container) => {
  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    console.log('afterElement: ', afterElement);
    const draggable = document.querySelector('.dragging');
    if (afterElement == undefined) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll('.draggable:not(.dragging)'),
  ];
  // reduce 메서드를 이용해 값을 누적시켜 모든 속성들의 y 값을 알 수 있음
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      // console.log(box);
      const offset = y - box.top - box.height / 2;
      // console.log('y:', y);
      // console.log('box.top: ', box.top);
      // console.log('box.height: ', box.height);
      // console.log('offset: ', offset);
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    // (예외 처리) 0 이하와 음의 무한대 사이에 element를 리턴
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// reduce function ex)

// const oneTwoThree = [1, 2, 3];
// result = oneTwoThree.reduce((acc, cur) => {
//   acc.push(cur % 2 ? '홀수' : '짝수');
//   return acc;
// // }, []); // 초깃값을 배열로 만들고, 값들을 배열에 push
// result;
