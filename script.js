function minCostToConnectRopes(arr) {
    // Create a min heap to store the rope lengths
    const minHeap = new MinHeap(arr);

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
        this.heap = arr;
        this.buildHeap();
    }

    size() {
        return this.heap.length;
    }

    buildHeap() {
        for (let i = Math.floor(this.size() / 2); i >= 0; i--) {
            this.heapifyDown(i);
        }
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp(this.size() - 1);
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
        this.heapifyDown(0);
        return minValue;
    }

    heapifyUp(index) {
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

    heapifyDown(index) {
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

// Example usage:
const arr = [4, 2, 7, 6, 9];
const minimumCost = minCostToConnectRopes(arr);
console.log(minimumCost); // Output should be 62
