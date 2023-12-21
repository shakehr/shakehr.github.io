function calculate() {
    // エナジーポイントの入力値を取得
    let ep = document.getElementById("ep");
    let energy = parseFloat(ep.value);

    // エラーチェック: 入力が数字でない場合や空の場合
    if (isNaN(energy) || ep.value.trim() === "") {
        alert("有効な数値を入力してください");
        return;
    }

    // 選択されたマップからsleepPowerを取得
    let selectedMap = document.querySelector('.map.selected');
    let sleepPower = parseFloat(selectedMap.getAttribute('data-sleeppower'));

    // ここで計算を行う例（適切な計算を追加してください）
    let calculatedResult = sleepPower / energy;
    let ceiledResult = Math.ceil(calculatedResult);
    let formattedResult = ceiledResult.toLocaleString(); // 切り上げた結果を3桁ごとにカンマで区切る

    // 計算結果を表示する要素を取得
    let scoreResultElement = document.getElementById("sleepScore");

    // 計算結果を表示
    scoreResultElement.textContent = formattedResult;

    // 睡眠時間の計算（分単位）
    let sleepTimeInMinutes = Math.ceil((ceiledResult * 510) / 100); // 分単位で計算

    // 睡眠時間を表示
    let sleepHour = Math.floor(sleepTimeInMinutes / 60);
    let sleepMinute = sleepTimeInMinutes % 60;
    let sleepHourElement = document.getElementById("sleephour");
    sleepHourElement.textContent = `${sleepHour}時間 ${sleepMinute}分`;
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
