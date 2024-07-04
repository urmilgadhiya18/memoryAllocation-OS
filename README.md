## Memory Allocation Algorithms Simulator

This is a webpage simulator that allows users to explore different memory allocation algorithms: First Fit (FF), Next Fit (NF), Best Fit (BF), and Worst Fit (WF).

### Features

* Users can define the number of memory holes and their sizes.
* Users can define the number of processes and their sizes.
* The simulator `visually represents` the memory allocation for each algorithm.
* It calculates and displays the following metrics for each algorithm in a table format:
    * Algorithm Name
    * Total Hole Size (KB)
    * Max Hole Size (KB)
    * Min Hole Size (KB)
    * Not Allocated Processes

### Getting Started

1. Clone or download this repository.
2. Open the `memoryAllocation.html` file in a web browser.

### **Example Input:**

* **Number of Memory Holes:** 3
* **Hole Sizes (KB):**
    * Hole 1: 300
    * Hole 2: 100
    * Hole 3: 118
* **Number of Processes:** 5
* **Process Sizes (KB):**
    * Process 1: 75
    * Process 2: 287
    * Process 3: 111
    * Process 4: 21
    * Process 5: 92

3. Follow the on-screen instructions to enter the data as specified above.
4. Click the "Save Data" button after entering process sizes.

### **Visual Representation of Memory**
1. **First Fit**:

   | Memory (KB) |  1 kb | P1  |    P3 | P4 | P5 | P  |    100 kb | P | 118 kb |
   |-------------|------|-----|-------|---|-----|-----|-------|---|-----|

2. **Next Fit**:

   | Memory (KB) |  1 kb | P1  |    P3 | P4 | P5 | P  |    100 kb | P | 118 kb |
   |-------------|------|-----|-------|---|-----|-----|-------|---|-----|

3. **Best Fit**:

   | Memory (KB) |  13 kb | P2 | P | 4 kb  |    P1 | P4 | P | 7 kb  |    P3 |
   |-------------|------|---|-----|-----|--------|---|-----|-----|-------|

4. **Worst Fit**:

   | Memory (KB) |  22 kb | P1 | P3 | P5  |    P | 100 kb |    P | 97 kb | P4 |
   |-------------|------|---|-----|-----|-------|---|--------|---|-----|

**Example Output Table:**

| Algo. | Total Hole Size (KB) | Max Hole (KB) | Min Hole (KB) | Not Allocated |
|---|---|---|---|---|
| First Fit | 219 | 118 | 1 | P2 |
| Next Fit | 219 | 118 | 1 | P2 |
| Best Fit | 24 | 13 | 4 | P5 |
| Worst Fit | 219 | 100 | 22 | P2 |

**Note:** This example showcases the output for a specific data set. The actual results will vary depending on the data you enter.

### Dependencies

This code does not require any external libraries.

### Author

Urmil Gadhiya
