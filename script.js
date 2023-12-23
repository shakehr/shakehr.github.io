function calculate() {
    // エナジーポイントの入力値を取得
    let ep = document.getElementById("ep");
    let energy = parseFloat(ep.value);

    // エラーチェック: 入力が数字でない場合や空の場合
    if (isNaN(energy) || ep.value.trim() === "") {
        alert("有効な数値を入力してください");
        return;
    }

    // 選択されたマップからデータ属性を取得
    let selectedMap = document.querySelector('.map.selected');
    if (!selectedMap) {
        alert("マップを選択してください");
        return;
    }
    let score4 = parseFloat(selectedMap.getAttribute('data-score4'));
    let score5 = parseFloat(selectedMap.getAttribute('data-score5'));
    let score6 = parseFloat(selectedMap.getAttribute('data-score6'));
    let score7 = parseFloat(selectedMap.getAttribute('data-score7'));
    let score8 = parseFloat(selectedMap.getAttribute('data-score8'));

    // 出現ポケモン数ごとの必要最低睡眠スコア
    let monsterScores = {
        4: (score4 / energy),
        5: (score5 / energy),
        6: (score6 / energy),
        7: (score7 / energy),
        8: (score8 / energy)
    };

    // エナジーポイントに対応する睡眠時間を計算
    let sleepTimes = {};
    let sleepScores = {};

    for (let count in monsterScores) {
        let requiredScore = monsterScores[count];
        sleepScores[count] = requiredScore;  // 必要最低睡眠スコアを保存

        let baseTime = 8 * 60 + 30; // 基準時間 (8時間30分) を分単位で表現
        let requiredTime = Math.ceil(requiredScore * baseTime / 100); // 切り上げ

        // 結果を保存
        sleepTimes[count] = {
            hour: Math.floor(requiredTime / 60),
            minute: requiredTime % 60
        };
    }

    // 結果を表示
    displayResults(sleepScores, sleepTimes);
}

// マップがクリックされたときに選択状態を切り替える
document.querySelectorAll('.map').forEach(function(map) {
    map.addEventListener('click', function() {
        document.querySelectorAll('.map').forEach(function(otherMap) {
            otherMap.classList.remove('selected');
        });
        map.classList.add('selected');
    });
});

function displayResults(sleepScores, sleepTimes) {
    let scoreResultElement = document.getElementById("sleepScore");
    let sleepHourElement = document.getElementById("sleephour");

    scoreResultElement.innerHTML = "";
    sleepHourElement.innerHTML = "";

    for (let count in sleepScores) {
        // 必要最低睡眠スコアを表示
        let scoreResult = document.createElement("p");
        scoreResult.textContent = "必要最低睡眠スコア(" + count + "体): " + Math.ceil(sleepScores[count]);
        scoreResultElement.appendChild(scoreResult);

        // 必要最低睡眠時間を表示
        let formattedResult = sleepTimes[count].hour + "時間 " + sleepTimes[count].minute + "分";
        let sleepResultElement = document.createElement("p");
        sleepResultElement.textContent = "必要最低睡眠時間(" + count + "体): " + formattedResult;
        sleepHourElement.appendChild(sleepResultElement);
    }
}
