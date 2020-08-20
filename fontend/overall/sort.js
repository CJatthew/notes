const sorts = {
	bubbleSort(arr) {
		let i, j, tempVal;
		
		for (i = 0, len = arr.length; i < len; i++) {
			for (j = 0; j < len - i - 1; j++) {
				if (arr[j] > arr[j + 1]) {
					tempVal = arr[j];
					
					arr[j] = arr[j + 1];
					arr[j + 1] = tempVal;
				}
			}
		}
	},
	selectionSort(arr) {
		let i, j, minIndex, tempVal;
		
		for (i = 0, len = arr.length; i < len; i++) {
			minIndex = i;
			
			for (j = i + 1; j < len; j++) {
				if (arr[minIndex] > arr[j]) {
					minIndex = j;
				}
			}
			
			tempVal = arr[i];
			arr[i] = arr[minIndex];
			arr[minIndex] = tempVal;
		}
	},
	insertionSort(arr) {
		let i, j, preIndex, currVal;
		
		for (i = 1, len = arr.length; i < len; i++) {
			preIndex = i - 1;
			currVal = arr[i];
			
			while(preIndex >= 0 && arr[preIndex] > currVal) {
				arr[preIndex + 1] = arr[preIndex];
				preIndex --;
			}
			
			arr[preIndex + 1] = currVal;
		}
	},
	shellSort(arr) {
		let len = arr.length;
		
		for (let gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
			for (let i = gap; i < len; i++) {
				let j = i, currVal = arr[i];
				
				while(j - gap >= 0 && arr[j - gap] > currVal) {
					arr[j] = arr[j - gap];
					j -= gap;
				}
				
				arr[j] = currVal;
			}
		}
	},
	mergeSort(arr) {
		let merge = (left, right) => {			
			let rets = [];
			
			let flag = left.length === 4
			
			while(left.length >0 && right.length > 0) {					
				if (left[0] >= right[0]) {
					rets.push(right.shift());
				} else {
					rets.push(left.shift());
				}
			}
			
			if (left.length) {
				rets = rets.concat(left);
			}
			
			if (right.length) {
				rets = rets.concat(right);
			}

			return rets;
		}
		
		let sort = (arr) => {
			let mid = Math.floor(arr.length / 2);
			
			if (mid === 0) {
				return arr;
			}

			let left = arr.slice(0, mid);
			let right = arr.slice(mid);
			
			return merge(sort(left), sort(right));
		}
		
		return sort(arr);
	},
	quickSort(arr) {
		let swap = (arr, i, j) => {
			let tempVal = arr[i];
			arr[i] = arr[j];
			arr[j] = tempVal;
		}
		
		let partition = (arr, left, right) => {
			let pivot = left, index = pivot + 1;
			
			for (let i = index; i <= right; i++) {
				if (arr[i] < arr[pivot]) {
					swap(arr, i, index);
					index ++;
				}
			}
			
			swap(arr, index - 1, pivot);
			return  index - 1;
		}
		
		let sort = (arr, left, right) => {
			let partitionIndex;
			
			left = typeof left !== 'number' ? 0 : left;
			right = typeof right !== 'number' ? arr.length - 1 : right;
			
			if (left < right) {
				partitionIndex = partition(arr, left, right);
				sort(arr, left, partitionIndex - 1);
				sort(arr, partitionIndex + 1, right);
			}
		}
		
		sort(arr);
	},
	heapSort(arr) {

	}
}

let arr = [4,5,63,2,2,6,26436,8]
sorts.quickSort(arr)
console.log(arr)