import './App.css';
import {Queue} from './functional'; 

let q = new Queue(); 
const push = (val) => {
  console.log("pushing", val); 
  q = Queue.push(q, val); /*Queue.print(q);*/ 
  console.log(q);
};
const head = () => {console.log("head"); console.log(Queue.head(q)); console.log();};
const pop = () => {console.log("popping"); q = Queue.pop(q); /*Queue.print(q);*/ console.log();};

// push(3);
// head(); // 3
// pop();
// push(5);
// push(7);
// push(9);
// push(11);
// head(); // 5
// pop();
// head(); //7
// pop();
// push(12); 
// head(); // 9
// push(15);
// head(); // 9
// pop();
// head(); // 11
// pop();
// head(); //12
// pop();
// head(); // 15

function App() {
  return (
    <div className="App">
        Yay, functional queues!
    </div>
  );
}

export default App;
