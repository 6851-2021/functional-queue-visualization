class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

    def set_next(self, next_node):
        self.next = next_node

class Stack:
    def __init__(self, head=None):
        self.head = head

    def set_head(self, head):
        self.head = head
    
    def push(self, val):
        new_node = Node(val, self.head)
        self.set_head(new_node)
    
    def pop(self):
        if self.head is None or self.head.next is None:
            self.head = None
        else:
            self.head = self.head.next

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
        count = 0
        node = self.head
        if node === None: 
            return 0
        while node is not None: 
            count += 1
            node = node.next
        return count 
