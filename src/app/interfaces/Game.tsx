interface Game {
  nameID: string;
  title: string;
  category: string[];
  description: string;
  imageType: string;
  dimension: {
    width: number;
    height: number;
  };
  status: {
    type: number;
    name: string;
  };
  type: number;
}

export default Game;
