//외부 모듈을 import해서 사용
import React from 'react'
import {  SafeAreaView,
          Text,
          TouchableHighlight,
          TouchableOpacity,
          View,
        } from 'react-native'

/* commit 과정에서 추가된 내용 */

//초기 선공권을 랜덤하게 정하는 변수
var randomTurn = Math.floor(Math.random() * 10) < 5 ? true : false

/* commit 과정에서 변경된 내용 

const newGameState = {
  //squares: Array(9).fill(null),
  squares: Array(36).fill(null),
  xIsNext: true,
}

*/

//newGameState 라는 클래스를 생성
//초기 상태의 state를 정의
const newGameState = {
  squares: Array(36).fill(null),
  xIsNext: randomTurn,
}

//컴포넌트 클래스를 상속받음
export default class App extends React.Component {

  //생성자를 통해 state의 초기값을 설정
  constructor(props) {
    super(props)
    this.state = newGameState
  }

  //누구의 턴인지 값을 리턴해주는 메소드
  whoseTurn() {
    return this.state.xIsNext ? 'X' : 'O'
  }

  //현재 state를 newGameState로 바꿔 초기 state로 돌아가는 메소드
  onNewGame() {
    this.setState({
      squares: newGameState.squares,
      xIsNext: (randomTurn = !randomTurn),
    })
  }

  //플레이어가 수를 놓는 메소드
  onMove(i) {
    let newSquares = this.state.squares.slice() //slice()를 통해 현재 state의 squares 값의 복사본을 만듬.
    const turn = this.whoseTurn() //현재 턴이 누구인지를 받아옴.
    if (this.state.squares[i] || winner(this.state.squares)) return null //이미 눌렀던 square 이거나
                                                                         //승자가 결정된 경우
                                                                         //square를 터치해도 기호가 마킹안됨.
    newSquares[i] = turn //위의 경우가 아니면 복사한 Board에 기호를 마킹
    //복사한 Board를 덮어씌우고, 턴을 교체한뒤 state를 재설정
    this.setState({
      squares: newSquares,
      xIsNext: !this.state.xIsNext,
    })
  }
          
  /* commit 과정에서 변경된 부분

  render() {
    const style = {
      backgroundColor: 'beige',
      flex: 1,
      alignItems: 'center',
    }

    return (
      <SafeAreaView style={style}>
        <Board squares={this.state.squares} onMove={(i) => this.onMove(i)} />
        <Status turn={this.whoseTurn()} winner={winner(this.state.squares)} onNewGame={() => this.onNewGame()} />
      </SafeAreaView>
    )
  }

  */

  //화면에 랜더링 되는 부분
  render() {
    const style = {
      backgroundColor: '#ECF6CE',
      flex: 1,
      flexDirection: 'column',
    }

    //Board를 현재 state의 Board로, Status를 현재 state의 Status로 적용
    return (
      <SafeAreaView style={style}>

       <View style={{flex: 2, backgroundColor: '#D0FA58',}}>
          <View style={{flex: 4,}}></View>
          <View style ={{flex: 5, alignItems: 'center'}}>
              <Text style={{fontSize: 20,}}>Quad Tic Tac Toe</Text>
          </View>
          <View style={{heigt: 60, backgroundColor: 'green',}}>
            <NewGameButton onNewGame={() => this.onNewGame()}/>
          </View>
        </View>

        <Board squares={this.state.squares} onMove={(i) => this.onMove(i)} />

        <View style={{flex: 2,}}>
          <Status turn={this.whoseTurn()} winner={winner(this.state.squares)}/>
          <View style={{flex: 1,}}></View>
        </View>
      </SafeAreaView>
    )
  }
}

//한줄을 아래로 늘린 보드판
const Board = ({squares, onMove}) => {
  return (
    <View style={{flex: 6, justifyContent: 'center',}}>
      <Row squares={squares} startIndex={0} onMove={onMove} />
      <Row squares={squares} startIndex={6} onMove={onMove} />
      <Row squares={squares} startIndex={12} onMove={onMove} />
      <Row squares={squares} startIndex={18} onMove={onMove} />
      <Row squares={squares} startIndex={24} onMove={onMove} />
      <Row squares={squares} startIndex={30} onMove={onMove} />
    </View>
  )
}

//한칸을 오른쪽으로 늘린 한줄
const Row = ({squares, startIndex, onMove}) => {
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center',}}>
      <Square label={squares[startIndex    ]} onPress={() => onMove(startIndex    )} />
      <Square label={squares[startIndex + 1]} onPress={() => onMove(startIndex + 1)} />
      <Square label={squares[startIndex + 2]} onPress={() => onMove(startIndex + 2)} />
      <Square label={squares[startIndex + 3]} onPress={() => onMove(startIndex + 3)} />
      <Square label={squares[startIndex + 4]} onPress={() => onMove(startIndex + 4)} />
      <Square label={squares[startIndex + 5]} onPress={() => onMove(startIndex + 5)} />
    </View>
  )
}

//보드판 한칸
const Square = ({label, onPress}) => {
  const style = {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#0B610B',
    justifyContent: 'center',
  }

  const textStyle = {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  }

  return (
    <TouchableHighlight style={style} onPress={onPress}>
      <Text style={[textStyle, {color : (label === 'X' ? '#e15043' : '#A901DB')}]}>{label}</Text>
    </TouchableHighlight>
  )
}

//현재 상태를 출력하는 하단 바
const Status = ({turn, winner}) => {
  const text = winner === null ? 'Tie game :-/'
        : winner !== undefined ? winner + ' wins!'
        : turn + "'s turn!!"

  return (
    <View style={{flex: 1, justifyContent: 'center', borderTopColor: '#610B0B', borderTopWidth: 5,
      borderBottomColor: '#610B0B', borderBottomWidth: 5,
      backgroundColor: (winner === 'X' ? '#e15043' : 
                        (winner === 'O' ? '#A901DB' : 
                          (winner === null ? 'green' : 
                            (turn === 'X' ? '#e15043' : '#A901DB'))))}}>
      <Text style={{fontSize: 25, textAlign: 'center', color: 'white'}}>{text}</Text>
    </View>
  )
}

//초기화 버튼
const NewGameButton = ({onNewGame}) => {
  return ( 
        <TouchableOpacity style={{justifyContent: 'center', backgroundColor: 'green', alignItems: 'flex-end'}} onPress={onNewGame}>
          <Text style={{fontSize: 15, color: 'white'}}>Reset       </Text>
        </TouchableOpacity>
  )
}

/* commit 과정에서 변경된 내용

const winner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  if (squares.indexOf(null) === -1) return null
  return undefined
}

*/

//승자 결정
const winner = squares => {

  //4x4 승리조건 
  const lines = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
  ]
  
  //뽑아내는 4x4의 첫번째 index 집합
  let xIndex = [0, 1, 2, 6, 7, 8, 12, 13, 14]

  while(xIndex.length > 0)
  {

    let x = xIndex.shift()

    //4x4로 추출
    let check = squares.slice(x, x+4).concat(squares.slice(x+6, x+10))
                        .concat(squares.slice(x+12, x+16)).concat(squares.slice(x+18, x+22))

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i]
      
      //확인한 4곳의 square가 값이 같으면 그 값의 기호가 승자다
      if (check[a] && check[a] === check[b] && check[a] === check[c] && check[a] === check[d]) {
          return check[a]
      }
    }
  }
  
  //Squares 배열내에 null(빈칸)이 존재하지 않으면 무승부 처리
  if (squares.indexOf(null) === -1) return null   
  //그 외의 경우엔 승자가 결정되지 않는다.
  return undefined
}
