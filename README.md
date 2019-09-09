React Native를 이용한
=============
6x6보드 4목게임
=============

> 시작하기 앞서..
> 프로젝트 완료 후 github의 존재를 알게 되어 commit이 없습니다.
> 그러므로 commit 했던 과정들은 밑에 따로 서술하겠습니다.

- - -

## 진행 방식

- - -

1. App 실행시 'X' 플레이어와 'O' 플레이어의 턴이 랜덤하게 결정됩니다.
2. 보드안에 칸을 터치할 경우 말을 놓을 수 있습니다.
3. 4목을 먼저 완성시키면 승리합니다.
3-1. 6x6판이 가득찰때까지 양쪽도 4목을 완성할 수 없을 경우 무승부가 됩니다.
4. Reset 탭을 눌러 게임을 초기화합니다. 이때, 선공했던 플레이어의 반대 플레이어가 선공을 갖습니다.
5. 위의 과정이 반복됩니다.

- - -

## 보드 판 구성

