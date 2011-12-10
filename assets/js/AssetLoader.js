var AssetLoader = Base.extend({
    // Instantiated functions
}, {
    // Static functions
    images: [],
    _imgLoadedCount: 0,
    _callback: undefined,

    _imgLoaded: function () {
        AssetLoader._imgLoadedCount++;

        if (AssetLoader._imgLoadedCount == AssetLoader.images.length) {
            if (AssetLoader._callback) {
                AssetLoader._callback.call();
            }
        }
    },

    load: function (callback) {
        AssetLoader._callback = callback;

        for (var i = 0, j = AssetLoader.images.length; i < j; i++) {
            var img = new Image();
            img.onload = AssetLoader._imgLoaded;
            img.src = AssetLoader.images[i].src;

            AssetLoader.images[i].img = img;
        }
    },

    queueImage: function (src, name) {
        name = name || src;

        AssetLoader.images.push({
            name: name,
            src: src,
            img: null
        });
    },

    getImage: function (name) {
        for (var i = 0, j = AssetLoader.images.length; i < j; i++) {
            if (name == AssetLoader.images[i].name) {
                return AssetLoader.images[i].img;
            }
        }

        return null;
    }
});