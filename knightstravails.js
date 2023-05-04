function knightMoves(start, end) {

	if (start > 7 || start < 0 || end > 7 || end < 0) return;

	class Knight {
		constructor(start = [0, 0]) {
			this.previousPosition = "";
			this.currentPosition = start;
			this.moveDirections = [
				[-2, -1],
				[-2, 1],
				[-1, -2],
				[-1, 2],
				[2, -1],
				[2, 1],
				[1, 2],
				[1, -2],
			];
		}
		getPossibleMoves() {
			const possibleMoves = [];
			this.moveDirections.forEach(move => {
				const X1 = this.currentPosition[0];
				const Y1 = this.currentPosition[1];
				const X2 = move[0];
				const Y2 = move[1];
				possibleMoves.push([X1+X2, Y1+Y2]);
			});
			return possibleMoves;
		}

		validateMoves(possibleMoves) {
			return possibleMoves.filter(move => {
				const X = move[0];
				const Y = move[1];
				if (X > 7 || X < 0 || Y > 7 || Y < 0) return false;
				else return true;
			});
		}

		BFS() {
			const board = {};
			board[JSON.stringify(start)] = "";
			const queue = [this.currentPosition];
			while (!(queue[0][0] === end[0] && queue[0][1] === end[1])) {
				const current = queue.shift();
				this.previousPosition = this.currentPosition
				this.currentPosition = current;
				const moves = this.validateMoves(this.getPossibleMoves());
				moves.forEach(move => {
					queue.push(move); 
					board[JSON.stringify(move)] = board[JSON.stringify(current)] + `${JSON.stringify(this.currentPosition)} `;
				})
			}
			const path = (board[JSON.stringify(end)] + JSON.stringify(end)).split(' ');
			console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`);
			path.forEach(move => console.log(move));
		}
	}

	return new Knight(start, end).BFS();
}

knightMoves([3,3], [4,3]);

// Expected: 3 moves - [3,3], [4,1], [6,2] [4,3]