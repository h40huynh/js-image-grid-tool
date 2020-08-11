class DrawSupport {
    constructor() {
        this.canvas = document.createElement('canvas')
        this.ctx = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
        this.numberOfDivde = document.getElementById('inumber').value
        this.color = 'pink'

        this.image = new Image()
        this.image.onload = () => {
            this.drawImage()
        }
        this.image.src = 'image.jpg'

        document.getElementById('setbutton').addEventListener('click', () => this.resetCanvas())
        document.getElementById('loadimageurl').addEventListener('click', () => this.getImageSrc())
        document.getElementById('loadimagefile').addEventListener('click', () => this.getImageFile())
    }

    getImageFile() {
        var reader = new FileReader();
        reader.onloadend = (e) => {
            this.image.src = reader.result
        }

        var file = this.image.src = document.getElementById('imagefile').files[0]
        if (file) {
            reader.readAsDataURL(file)
        }
    }

    getImageSrc() {
        this.image.src = document.getElementById('imageurl').value
    }

    resetCanvas() {
        this.numberOfDivde = document.getElementById('inumber').value
        this.color = document.getElementById('icolor').value

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawImage()
    }

    drawLine(x_start, y_start, x_end, y_end) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color
        this.ctx.moveTo(x_start, y_start);
        this.ctx.lineTo(x_end, y_end);
        this.ctx.stroke();
    }

    drawImage() {
        this.canvas.width = this.image.width
        this.canvas.height = this.image.height
        this.ctx.drawImage(this.image, 0, 0)
        for (let i = 1; i < this.numberOfDivde; i++) {
            this.drawLine(0, i * (this.image.height / this.numberOfDivde), this.image.height, i * (this.image.height / this.numberOfDivde))
            this.drawLine(i * (this.image.width / this.numberOfDivde), 0, i * (this.image.width / this.numberOfDivde), this.image.height)
        }
    }
}

var app = new DrawSupport()
document.getElementById('hideOptions').addEventListener('click', () => {
    var container = document.getElementById('tools-container');
    if (container.style.display != 'none') {
        container.style.display = 'none'
    } else {
        container.style.display = 'block'
    }
})