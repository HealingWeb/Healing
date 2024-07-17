# OASIS
<br/>
<img width="836" alt="oasis" src="https://github.com/user-attachments/assets/56df2092-a75c-406b-b99b-7f669e0f0300">

나의 마음 속 안식처, OASIS에서 나의 심리를 알아보고 마음을 다스려보세요.

컬러 피라미드 테스트와 PITR 테스트를 통해 심리 분석을 하고, 마음 속 평화를 찾아보세요.

Interactive Web으로써 사용자에게 즐거움과 재미를 주며 잠시나마 휴식을 취하고, 예상치 못한 디테일에 감동을 선사하며 힘든 일을 잊게 해주고자 제작하였습니다.

## Team
<br/>

**오세연** <a href="https://github.com/Seyeon321"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"></a>

**홍바다** <a href="https://github.com/BadaHong"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white"></a>




## Tech Stack
<br/>

**프론트엔드**

- JavaScript, HTML, CSS
- IDE: VSCode

**API**
- HTML5 Canvas API




## Preview
<br/>

**메인페이지**

알다가도 모르겠고 다스리기 어려운 우리의 마음 속을 표현하기 위해 우주 컨셉으로 디자인 하였습니다.

**오아시스 페이지**

사용자에게 잠시나마 힐링할 시간을 주고, 걱정을 잊을 수 있도록 쉼터 공간을 만들고자 했습니다.

<img width="300" alt="db" src="https://github.com/MunhwaSaenghwal/cultures/assets/110375619/652e1685-418b-4bbc-b2a5-1cadb325ee44">

<img width="300" alt="db" src="https://github.com/MunhwaSaenghwal/cultures/assets/110375619/da2ca3ce-1de1-4cca-8983-4ee2eb8939b3">

<img width="300" alt="db" src="https://github.com/MunhwaSaenghwal/cultures/assets/110375619/df694cbb-6aa9-485f-b6da-8006690a5193">



**컬러 피라미드 페이지**

컬러 피라미드 테스트 화면에서는 움직이는 그라데이션을 이용해 디자인 하였습니다.



**PITR 페이지**

PITR 테스트 화면에서는 비를 컨셉으로 디자인 하였습니다.



https://github.com/user-attachments/assets/fc8a39b9-f5a4-4ab7-8dff-c26b85ba142c





## Details
<br/>

해당 웹 어플리케이션은 HTML5 Canvas API를 사용하였습니다.

### 메인 페이지

메인 페이지는 총 4개의 화면으로 구성되어 있습니다. `스크롤 애니메이션`을 구현하여 한번의 스크롤마다 하나의 화면이 나오도록 조정하였습니다.

웹의 모든 페이지에는 왼쪽 상단에 홈 화면으로 돌아가는 로고가 위치해있습니다.

디테일을 위해 웹 이름이 `fade-out` 효과를 통해 강조되게 하였습니다.

메인페이지의 두번째 화면에서는 `3D Pyramid`를 통해 컬러 피라미드 테스트를 시각적으로 소개합니다. 피라미드에 그라데이션과 그림자를 넣어 현실감을 더했고, 회전을 시켜 3D를 더욱 표현하고자 했습니다. 3D 피라미드를 클릭하면 해당 테스트에 대한 설명서가 `fade-in` 효과를 통해 나옵니다. 다시 설명서를 클릭하면 `fade-out` 효과를 통해 피라미드가 등장합니다. 설명서를 클릭 했을 때 함께 나타나는 Start 버튼을 누르면 테스트를 할 수 있는 페이지로 이동하게 됩니다.

세번째 화면에서는 `Ripple Effect` 를 사용하여 물방울이 떨어지면 물이 퍼지는 현상을 구현하여  PITR 테스트를 표현했습니다. 여러개의 타원들이 ripple을 형성하고, 물방울이 튀는 것을 구현했습니다. 피라미드 화면에서와 마찬가지로 Ripple을 클릭하면 테스트 설명서가 나오고, Start 버튼을 누르면 PITR 테스트 페이지로 이동하게 됩니다.

마지막 페이지인 오아시스 페이지에서는 사용자의 `mouse interaction`을 강조하기 위해 사용자만의 쉼터 공간으로 지정했습니다. 해당 화면의 효과들은 첫번째 화면과 동일하게 적용되어 있습니다. Particle 클래스로 만든 여러개의 객체들이 화면에서 움직이고, 각 particle들이 서로 근접하면 선을 이어 별자리처럼 보이게 하는 효과를 넣었습니다. 여기에 mouse cursor의 위치를 인식하게 하여 커서에 근접한 particle들을 force를 가해 끌어 당기는 효과를 넣었습니다.


### 컬러 피라미드 테스트

컬러 피라미드 테스트 페이지의 배경은 `Particles 객체`를 이용하여 blur 처리를 하여 `움직이는 그라데이션`처럼 보이도록 디자인 했습니다.

해당 테스트는 테스터가 선호하는 색상을 피라미드의 위에서부터 아래로, 왼쪽부터 오른쪽으로 차례대로 드래그하여 채울 수 있습니다. 색은 중복 가능하며 원치 않을 경우 다 채우지 않아도 됩니다. 색을 고른 후 화살표 버튼을 누르면 심리 분석 결과지가 나옵니다.

결과지에는 색의 사용량 및 고른 순서를 계산하여 상위 3가지 색상에 대한 평가 및 설명이 나옵니다. 또한, 배경의 particle들의 색깔이 상위 3가지 색상에 대해 `동적으로 적용`되어 결과에 따라 다른 배경색이 채워지게 됩니다.

다른 색깔에 대한 정보를 보고 싶으면 오른쪽 하단에 위치한 플러스 버튼을 클릭하면 전체 결과 카드가 나옵니다. 결과 카드는 자동 `swipe-slide`를 이용하여 구현하였으며 직접 스와이프 하여 넘길 수도 있습니다.

<img width="300" alt="db" src="https://github.com/MunhwaSaenghwal/cultures/assets/110375619/c66e552d-938c-4cab-912e-f313c20b3f9e">






## Published Link
<br/>

https://healingweb.github.io/Healing/
