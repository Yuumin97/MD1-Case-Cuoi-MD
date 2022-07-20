class Category {
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }
}
class Song {
    constructor(name, lyrics, category) {
        this.name = name
        this.lyrics = lyrics
        this.category = category
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    getLyrics() {
        return this.lyrics
    }

    setLyrics(lyrics) {
        this.lyrics = lyrics
    }

    getCategory() {
        return this.category
    }

    setCategory(category) {
        this.category = category
    }
}
class KhoChuaNhac {
    constructor() {
        this.categoryList = []
        this.songList = []
    }
    add(name) {
        if (name.trim() === '') {
            alert('Không ghi gì à')
            return
        } else if (this.check(name)) {
            alert('Có rồi thêm làm gì nữa')
            return
        }
            this.categoryList.push(new Category(name))
        this.show()
    }
    edit(index) {
        let name = prompt('Category: ', this.categoryList[index].name)
        if (name.trim() === '') {
            alert('Không ghi gì à')
            return
        } else if (this.check(name)) {
            alert('Có rồi thêm làm gì nữa')
            return
        }
        this.categoryList.push(new Category(name))
        this.show()
    }

    delete(index) {
        this.categoryList.splice(index, 1)
        this.show()
    }
    check(name) {
        let check = false
        this.categoryList.forEach(checkchu => {
            if (checkchu.name.toLowerCase() === name.trim().toLowerCase()) check = true
        })
        return check
    }
    show() {

        let div = document.querySelector('#category')
        let select = document.querySelector('#selectCategory')
        div.replaceChildren()
        select.replaceChildren()

        let table = document.createElement('table')

        table.innerHTML = '<tr style="background-color: cadetblue"><td>STT</td><td>Name</td><td>Edit</td><td>Delete</td></tr>'

        this.categoryList.forEach((category, i) => {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.append(i + 1)
            tr.append(td)

            let tdName = document.createElement('td')
            tdName.append(category.name)
            tr.append(tdName)

            let editButton = document.createElement('button')
            editButton.innerHTML = 'Edit'
            editButton.onclick = () => {
                this.edit(i)
            }
            let tdEdit = document.createElement('td')
            tdEdit.append(editButton)
            tr.append(tdEdit)

            let deleteBtn = document.createElement('button')
            deleteBtn.innerHTML = 'Delete'
            deleteBtn.onclick = () => {
                this.delete(i)
            }
            let tdDelete = document.createElement('td')
            tdDelete.append(deleteBtn)
            tr.append(tdDelete)

            table.append(tr)
            div.append(table)

            let opt = document.createElement('option')
            opt.innerHTML = category.name
            select.append(opt)
        })
    }


    addSong(nameSong, lyrics) {
        let cate = this.categoryList.find(cate => cate.name === document.querySelector('select').value)
        this.songList.push(new Song(nameSong, lyrics, cate.name))
        this.showSongList()
    }
    showSongList() {
        let div = document.querySelector('#songList')
        div.replaceChildren()

        let table = document.createElement('table')

        table.innerHTML = '<tr style="background-color: lightgreen"><td>ID</td><td>Name</td><td>Thể Loại</td><td>Lyrics</td>'

        this.songList.forEach((song, i) => {
            let tr = document.createElement('tr')
            let td = document.createElement('td')
            td.append(i + 1)
            tr.append(td)

            let tdName = document.createElement('td')
            tdName.append(song.name)
            tr.append(tdName)

            let tdCate = document.createElement('td')
            tdCate.append(song.category)
            tr.append(tdCate)
            table.append(tr)

            let tdLyrics = document.createElement('td')
            tdLyrics.append(song.lyrics)
            tr.append(tdLyrics)
            table.append(tr)


        })

        div.append(table)
    }
}

let khoChua = new KhoChuaNhac()

khoChua.show()

khoChua.add('Nhạc Đỏ')
khoChua.add('Nhạc Vàng')
khoChua.add('Nhạc Trẻ')
khoChua.add('Nhạc Rock')

khoChua.showSongList()

document.querySelector("button").onclick = () => {
    khoChua.add(document.querySelector('#categoryCreate').value)
}

document.querySelector('#createSong').onclick = () => {
    let name = document.querySelector('#nameSong').value
    let lyrics = document.querySelector('#lyrics').value
    khoChua.addSong(name, lyrics)
}
