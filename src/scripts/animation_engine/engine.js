class AnimationEngine {
    canvas;
    context;

    // 配列や変数の描画位置を管理
    arrays;
    arrays_length;
    variants;

    description;

    msg_font = {
        size: 26,
        font: "serif",
        val: "26px serif",
    }
    var_font = {
        size: 18,
        font: "serif",
        val: "18px serif"
    };
    var_size = {
        margin: 40,
        width: 55,
        height: 55,
    };

    constructor(canvasID, width, height) {
        this.description = "";
        this.variants = [];
        this.arrays = [];
        this.arrays_length = [];
        this.canvas = document.getElementById(canvasID);
        this.context = canvas.getContext("2d");
        this.resize(width, height);
    }

    resize(width, height) {
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);

        for (const key in this.variants) {
            this.variants[key].x = width - 2 * this.var_size.width;
        }

        this.draw();
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw() {
        requestAnimationFrame(() => this.draw());
        this.clear();
        this.context.font = this.msg_font.val;
        this.context.fillText(this.description, this.msg_font.size, this.msg_font.size);
        for (const key in this.variants) {
            const val = this.variants[key];
            this.draw_var(key, val);
        }
        for (const key in this.arrays) {
            const val = this.arrays[key];
            this.draw_var(key, val);
        }
    }

    draw_var(name, val) {
        this.context.fillStyle = val.bg;
        this.context.fillRect(val.x, val.y, this.var_size.width, this.var_size.height);
        this.context.strokeRect(val.x, val.y, this.var_size.width, this.var_size.height);

        this.context.fillStyle = "#000000";
        this.context.font = this.var_font.val;
        this.context.fillText(name,
            val.x + this.var_size.width * 0.2,
            val.y + this.var_size.height + this.var_font.size);
        this.context.fillText(val.value,
            val.x + this.var_size.width * 0.4,
            val.y + this.var_size.height * 0.8);
    }

    defVar(name, value) {
        let max_y = 0;
        for (const key in this.variants) {
            max_y = Math.max(max_y, this.variants[key].y);
        }
        max_y += this.var_size.height + this.var_size.margin;

        this.variants[name] = {
            x: this.canvas.width - 2 * this.var_size.width,
            y: max_y,
            value: value,
            bg: "#FFFFFF",
        };
    }

    defArray(name, value) {
        let max_y = 0;
        for (const key in this.arrays) {
            max_y = Math.max(max_y, this.arrays[key].y);
        }
        max_y += this.var_size.height + this.var_size.margin;
        let next_x = this.var_size.margin;

        this.arrays_length[name] = value.length;
        for (let i = 0; i < value.length; i++) {
            this.arrays[name + "[" + i + "]"] = {
                x: next_x,
                y: max_y,
                value: value[i],
                bg: "#FFFFFF",
            }
            next_x += this.var_size.width;
        }
    }

    async divideAt(name, idx) {
        let key = (name, idx) => name + "[" + idx + "]";
        for (let i = idx; i < this.arrays_length[name]; i++) {
            this.arrays[key(name, i)].x += this.var_size.margin / 2;
        }
        await sleep(200);
    }

    async mergeAt(name, idx) {
        let key = (name, idx) => name + "[" + idx + "]";
        for (let i = idx; i < this.arrays_length[name]; i++) {
            this.arrays[key(name, i)].x -= this.var_size.margin / 2;
        }
        await sleep(200);
    }

    getVar(name) {
        if (name in this.arrays) {
            return this.arrays[name];
        }
        else {
            return this.variants[name];
        }
    }

    async color(name, color) {
        this.getVar(name).bg = color;
        await sleep(200);
    }

    async write(name, value) {
        this.getVar(name).value = value;
        await sleep(200);
    }

    async describe(msg) {
        this.description = msg;
        await sleep(200);
    }

    async swap(v1name, v2name) {
        let v1 = this.getVar(v1name);
        let v2 = this.getVar(v2name);
        if (v1.x > v2.x) {
            [v1, v2] = [v2, v1];
            [v1name, v2name] = [v2name, v1name];
        }
        let v1x = v1.x, v1y = v1.y;
        let v2x = v2.x, v2y = v2.y;

        await this.swapAnimation(v1, v2);

        if (v1name in this.arrays) {
            this.arrays[v1name] = v2;
        }
        else {
            this.variants[v1name] = v2;
        }
        if (v2name in this.arrays) {
            this.arrays[v2name] = v1;
        }
        else {
            this.variants[v2name] = v1;
        }
    }

    async swapAnimation(v1, v2) {
        let v1x = v1.x, v1y = v1.y;
        let v2x = v2.x, v2y = v2.y;

        let duration = 500; // 500ms
        let xDistance = v1x - v2x; // signed distance
        let yDistance = v1y - v2y;
        let start = Date.now();
        const loop = async () => {
            const elapsed = Math.max(1, Date.now() - start);
            const progress = elapsed / duration;

            v1.x = v1x - xDistance * progress;
            v2.x = v2x + xDistance * progress;

            v1.y = v1y - yDistance * progress + this.var_size.height * Math.sin(progress * Math.PI);
            v2.y = v2y + yDistance * progress - this.var_size.height * Math.sin(progress * Math.PI);

            this.draw();
            if (elapsed < duration) {
                requestAnimationFrame(loop);
            }
            else {
                [v1.x, v2.x] = [v2x, v1x];
                [v1.y, v2.y] = [v2y, v1y];
            }
        };
        loop();
        await sleep(duration + 30); // アニメーションが終わるまで待つ
    }
}