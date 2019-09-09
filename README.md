React Native를 이용한 6x6보드 4목게임
=============

apk파일 링크 : https://expo.io/artifacts/7761d793-4e39-4f05-aa48-f25c94d5f7d1

> 시작하기 앞서..  
> 프로젝트 완료 후 github의 존재를 알게 되어 commit이 없습니다.  
> 그러므로 commit 했던 과정들은 밑에 서술하고 소스코드 내에 주석의 형태로 삽입하겠습니다.

- - -

## 진행 방식

1. App 실행시 'X' 플레이어와 'O' 플레이어의 턴이 랜덤하게 결정됩니다.
<img src="https://user-images.githubusercontent.com/53474371/64537865-94e20780-d356-11e9-9a51-afeb6f354b41.jpg" width="20%">
2. 보드안에 칸을 터치할 경우 말을 놓을 수 있습니다.
<img src="https://user-images.githubusercontent.com/53474371/64537926-af1be580-d356-11e9-9f47-a4fd2a729b17.jpg" width="20%">
3. 4목을 먼저 완성시키면 승리합니다.
<img src="https://user-images.githubusercontent.com/53474371/64537944-b7742080-d356-11e9-9fb9-92d4281e4d93.jpg" width="20%">
3-1. 6x6판이 가득찰때까지 양쪽도 4목을 완성할 수 없을 경우 무승부가 됩니다.
<img src="https://user-images.githubusercontent.com/53474371/64537968-bfcc5b80-d356-11e9-9822-d0791e9c96c6.jpg" width="20%">
4. Reset 탭을 눌러 게임을 초기화합니다. 이때, 선공했던 플레이어의 반대 플레이어가 선공을 갖습니다.
<img src="https://user-images.githubusercontent.com/53474371/64537983-c78c0000-d356-11e9-8b5c-6193fbd5b204.jpg" width="20%">
5. 위의 과정이 반복됩니다.

- - -

## 보드 판 구성

* 보드 판의 말이 놓여지는 칸 하나를 생성 했습니다.
```const Square = ({label, onPress}) => {
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
```

* 그 후 한칸을 오른쪽으로 늘려 한 줄을 만들었습니다.
```const Row = ({squares, startIndex, onMove}) => {
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
```

* 마지막으로 한 줄을 아래로 늘려 보드판을 생성했습니다.
```const Board = ({squares, onMove}) => {
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
```

- - -

## 승자 선정 방식

>OMR 형식의 답안지를 체점할 때 같은 종이에 정답인 부분을 구멍뚫고 답안지와 겹쳐놓아 체점하는 방법을 적용해보았습니다.

<img src="https://user-images.githubusercontent.com/53474371/64538978-96143400-d358-11e9-9dd7-51bdaf07d486.PNG" width="100%">  
<img src="https://user-images.githubusercontent.com/53474371/64539043-b3490280-d358-11e9-9e38-4eb420c0001a.PNG" width="100%">

```
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

  while(xIndex.length > 0) {
    let x = xIndex.shift()
    
    //4x4로 추출
    
    let check = squares.slice(x, x+4).concat(squares.slice(x+6, x+10))
                        .concat(squares.slice(x+12, x+16)).concat(squares.slice(x+18, x+22))
                        
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i]
      if (check[a] && check[a] === check[b] && check[a] === check[c] && check[a] === check[d]) {
          return check[a]
      }
    }
  }
  if (squares.indexOf(null) === -1) return null // 
  return undefined
}
```

- - -

## Commit 과정

* 초기에는 3x3 보드 3목게임(Tic Tac Toe)으로 구현했었습니다.
* Tic Tac Toe로 구현했을 당시에는 승리 조건을 보드판안의 모든 경우의 수를 대입해보는 것으로 구현했습니다.
* 초기엔 항상 'X'가 선공이었고, 게임을 초기화 해도 'X'의 선공으로 시작했습니다.
* Flexbox를 활용하여 랜더링 되는 부분을 개선했습니다.

- - -

## 추후 개선 가능점

> 프로젝트 당시 할애된 시간이 많지 않아(공부 기간 : 2주) JavaScript와 React Native의 중요 기능들을 빠르게 익히는데 중점을 두었습니다.
> JavaScript와 React Native의 추가 기능을 더 익히고 Node.js를 공부 할 수 있다면 아래 내용들을 개선할 수 있습니다.

1. 어플 시작시 게임 화면으로 바로 진입하는 것이 아닌 메인화면을 만들고  
게임 방식을 현재방식(하나의 기기로 두 플레이어가 플레이)과 서버를 이용한 멀티 플레이 방식을 선택하게 할 수 있습니다.
2. 어플 내에서 플레이어가 직접 보드 판의 크기를 설정하고 승리 조건도 설정할 수 있게 할 수 있습니다.  
예) 10x10과 6목임을 입력하여 해당 조건에 맞는 게임을 생성합니다.
