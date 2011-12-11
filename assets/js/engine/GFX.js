var GFX = Base.extend({
    // Instantiated functions
}, {
    // Static functions
    width: 0,
    height: 0,
    canvas: null,
    ctx: null,

    initialise: function (parent, width, height) {
        this.width = width;
        this.height = height;

        // Create the drawing surface
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        parent.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");
    }
});