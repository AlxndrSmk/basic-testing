import { generateLinkedList } from './index';

const values1 = [1, 2, 3, 4, 5];
const values2 = ['a', 'b', 'c', 'd', 'e'];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const linkedList = generateLinkedList(values1);

    const createdLinkedList = {
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: {
            value: 4,
            next: {
              value: 5,
              next: {
                value: null,
                next: null,
              },
            },
          },
        },
      },
    };

    expect(linkedList).toStrictEqual(createdLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(values2);
    expect(linkedList).toMatchSnapshot();
  });
});
