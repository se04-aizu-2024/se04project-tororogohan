class AnimationEngine {
    canvas;
    canvas_size;
    context;

    // 配列や変数の描画位置を管理
    arrays;
    arrays_length;
    variants;

    font = {
        size: 22,
        font: "serif",
        val: "18px serif"
    };
    var_size = {
        margin: 40,
        width: 55,
        height: 55,
    };

    constructor(canvasID, width, height) {
        this.variants = [];
        this.arrays = [];
        this.arrays_length = [];
        this.canvas_size = { height: height, width: width, };
        this.canvas = document.getElementById(canvasID);
        this.context = canvas.getContext("2d");
        this.resize(width, height);
    }

    resize(width, height) {
        this.canvas_size = { height: height, width: width, };
        this.canvas.setAttribute("width", width);
        this.canvas.setAttribute("height", height);

        for (const key in this.variants) {
            this.variants[key].x = width - 2 * this.var_size.width;
        }

        this.draw();
    }

    draw() {
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
        this.context.strokeRect(val.x, val.y, this.var_size.width, this.var_size.height);
        this.context.font = this.font.val;
        this.context.fillText(name,
            val.x + this.var_size.width * 0.2,
            val.y + this.var_size.height + this.font.size);
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
            x: this.canvas_size.width - 2 * this.var_size.width,
            y: max_y,
            value: value,
            marked: false,
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
                marked: false,
            }
            next_x += this.var_size.width;
        }
    }
}