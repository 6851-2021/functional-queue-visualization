const info_functional = (<>A functional data structure can never be modified. Instead,
when performing an operation, a <i>new copy</i> of the data structure is returned.
This implies a property called <i>full persistence</i>: previous versions of the data structure remain accessible
forever, and we can perform operations on any version we choose.</>);
const info_stacks = (<>A functional stack is probably the simplest example of a functional data
    structure. It consists solely of a pointer to the head of a one-way linked list,
    which contains the stack’s elements from top to bottom. To push, we add a new
    element to the one-way linked list, and return the pointer to this new element.
    To pop, we return a pointer to the second element of the linked list.</>);
const info_queues = (<>Functional queues are a natural next step. Ideally, we would like to implement
                       them with a <i>constant</i> number of changes per enqueue/dequeue. This turns
                       out to be much harder than for stacks! But there is a solution: using our functional 
                       stacks as a black box, we can simulate each queue operation using a constant number of
                        operations on a set of six stacks. The primary goal of our visualizer is to show
                        these operations in action, and how they come together to make a functional queue.</>);
const info_description = (<><b>Functional data structures</b><br/>{info_functional}<br/>
                            <b>A simple example: functional stacks</b><br/>{info_stacks}<br />
                            <b>What about a functional queue?</b><br/>{info_queues}</>);

export {info_description}