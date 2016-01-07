function AssetManager() {
    this.successCount = 0;
    this.errorCount = 0;
    this.cache = [];
    this.downloadQueue = [];
}

AssetManager.prototype.queueDownload = function (path) {
    console.log(path.toString());
    this.downloadQueue.push(path);
};

AssetManager.prototype.isDone = function () {
    return (this.downloadQueue.length == this.successCount + this.errorCount);
};

AssetManager.prototype.downloadAll = function (callback) {
    if (this.downloadQueue.length === 0) window.setTimeout(callback, 100);
    for (var i = 0; i < this.downloadQueue.length; i++) {
        var path = this.downloadQueue[i];
        var img = new Image();
        img.success = false;
        var self = this;
        img.addEventListener("load", function () {
            console.log("loaded: " + this.src.toString());
            img.success = true;
            self.successCount++;
            if (self.isDone()) {
                callback();
            }
        });
        img.addEventListener("error", function () {
            console.log("error: " + this.src.toString());
            self.errorCount++;
            if (self.isDone()) {
                callback();
            }
        });
        img.src = path;
        this.cache[path] = img;
    }
};

AssetManager.prototype.getAsset = function (path) {
    return this.cache[path];
};
