class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

    def set_next(self, next_node):
        self.next = next_node

class Stack:
    def __init__(self):
        self.head = None
        self.size = 0

    def __set_head(self, head):
        self.head = head
    
    def push(self, val):
        new_node = Node(val, self.head)
        self.__set_head(new_node)
        self.size += 1
    
    def pop(self):
        if self.head is None:
            return
        if self.head.next is None:
            self.head = None
        else:
            self.head = self.head.next
        self.size -= 1

    def print_stack(self):
        node = self.head
        printed = ""
        while node is not None:
            printed += str(node.val) + '->'
            node = node.next
        return printed

    def reversed_copy(self):
        node = self.head
        reversed_stack = Stack()
        while node is not None:
            reversed_stack.push(node.val)
            node = node.next
        return reversed_stack
    
    def get_size(self): 
        return self.size
        """
        count = 0
        node = self.head
        if node is None: 
            return 0
        while node is not None: 
            count += 1
            node = node.next
        return count 
        """
