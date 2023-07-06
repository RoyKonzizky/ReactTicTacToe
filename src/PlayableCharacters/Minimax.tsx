function minimax(depth, nodeIndex, isMax, scores, h) {
  if (depth == h) return scores[nodeIndex];
  if (isMax)
    return Math.max(
      minimax(depth + 1, nodeIndex * 2, false, scores, h),
      minimax(depth + 1, nodeIndex * 2 + 1, false, scores, h),
    );
  else
    return Math.min(
      minimax(depth + 1, nodeIndex * 2, true, scores, h),
      minimax(depth + 1, nodeIndex * 2 + 1, true, scores, h),
    );
}

function log2(n) {
  return n == 1 ? 0 : 1 + log2(n / 2);
}

const scores = [3, 5, 2, 9, 12, 5, 23, 23];
const n = scores.length;
const h = log2(n);
const res = minimax(0, 0, true, scores, h);

export default res;
