/// <reference path="../../typings/main.d.ts" />

import ZundokoRecord from './ZundokoRecord';

// 履歴情報を永続化するクラス。
export default class ZundokoStore {
    // localStrageに保存するキー文字列。
    private static KEY: string = 'zundokoSaveKey';

    // 内部保存するかフラグ
    public localSave: boolean = true;

    public load(): ZundokoRecord[] {
        let loaded: ZundokoRecord[] = [];

        // まずはLocalStrageからキーを取得
        let key: string = localStorage.getItem(ZundokoStore.KEY);
        if (this.localSave && key !== null) {
            // あるようなら、サーバに「このキーでデータくれ」と投げる。
            const json = $.ajax({
                           url: "loadJson",
                           data: { key: key },
                           type: "POST",
                           cache: false,
                           async: false
                       }).responseText;

            // サーバから値が取れるようなら
            if (json !== null) {
                loaded = JSON.parse(json);
            }

            return loaded;

        }

        return loaded;
    }

    public save(nowRecord: ZundokoRecord, history: ZundokoRecord[]) {
        if (this.localSave) {


            // まずはLocalStrageからキーを取得
            let key: string = localStorage.getItem(ZundokoStore.KEY);
            if (key == null || key == "") {
                // 無いなら、新しく「この端末専用」のキーを作成
                key = this.makeId();
                localStorage.setItem(ZundokoStore.KEY, key);
            }


            let forSave: ZundokoRecord[] = [];
            // 一度でもボタンが押されてたら、
            if (nowRecord.line.length > 0) {
                forSave = history.slice(0); // 手っ取り早い配列のコピー。
                forSave.unshift(nowRecord);
            }
            // JSON文字列にしてlocalStrage保存。
            let json: string = JSON.stringify(forSave);

            // サーバに「このキーで保存して」を依頼
             $.post("saveJson",{ key: key , json : json });

        }
    }

    // UUID(っぽいもの)を作る。
    private makeId(): string {
        let pattern: number[] = [2, 1, 1, 1, 3];
        let id: string = "";
        for (let i = 0; i < pattern.length; i++) {
            if (i > 0) {
                id += "-";
            }
            for (let j = 0; j < pattern[i]; j++) {
                id += this.makeRandStr4();
            }
        }
        return id;
    }

    // ランダムな英数４字を作る。
    private makeRandStr4(): string {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }


}
