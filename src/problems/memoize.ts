type Fn = (...params: number[]) => number

function memoize(fn: Fn): Fn {
    const cache: Record<string, number> = {};

    return function(...args) {
        let temp = JSON.stringify(args);

        if (temp in cache) {
            return cache[temp];
        }
        
        cache[temp] = fn(...args)
        return cache[temp];
    }
}