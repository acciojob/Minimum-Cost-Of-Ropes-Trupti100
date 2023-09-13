function calculateMinCost() {
  //your code here
  
// Function to find the minimum cost to connect ropes
function calculateMinCost(ropes) {
    // Convert the input string of comma-separated integers to an array of integers
    const ropeLengths = ropes.split(',').map(Number);

    // Create a min heap to store the rope lengths
    const minHeap = new MinHeap(ropeLengths);

    let totalCost = 0;

    // Continue until there is only one rope left in the heap
    while (minHeap.size() > 1) {
        // Extract the two smallest ropes from the heap
        const rope1 = minHeap.extractMin();
        const rope2 = minHeap.extractMin();

        // Calculate the cost of connecting these two ropes
        const cost = rope1 + rope2;

        // Add the cost to the total cost
        totalCost += cost;

        // Insert the combined rope back into the heap
        minHeap.insert(cost);
    }

    return totalCost;
}

// MinHeap class for heap operations
class MinHeap {
    constructor(arr = []) {
        this.heap = [];
        for (const element of arr) {
            this.insert(element);
        }
    }

    size() {
        return this.heap.length;
    }

    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.size() === 0) {
            return null;
        }

        if (this.size() === 1) {
            return this.heap.pop();
        }

        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return minValue;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    bubbleDown(index) {
        while (true) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftIndex < this.size() && this.heap[leftIndex] < this.heap[smallestIndex]) {
                smallestIndex = leftIndex;
            }

            if (rightIndex < this.size() && this.heap[rightIndex] < this.heap[smallestIndex]) {
                smallestIndex = rightIndex;
            }

            if (index !== smallestIndex) {
                this.swap(index, smallestIndex);
                index = smallestIndex;
            } else {
                break;
            }
        }
    }

    swap(index1, index2) {
        const temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }
}

// Get the input element and result div
const inputElement = document.getElementById('input');
const resultDiv = document.getElementById('result');

// Add an event listener to the input element
inputElement.addEventListener('input', () => {
    const inputText = inputElement.value;
    const minimumCost = calculateMinCost(inputText);
    resultDiv.innerText = `Minimum Cost: ${minimumCost}`;
});
