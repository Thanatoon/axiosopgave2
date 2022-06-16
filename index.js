const baseUrl = "https://anbo-restbookquerystring.azurewebsites.net/api/books"

Vue.createApp({
    data() {
        return {
            books: [],
            idToGet: -1,
            singleBook: null,
            addBookData: { title: "", price: 0 },
            deleteMessage: "",
            deleteId: 0,
            updateBookData: { id: 0, title: "", price: 0 },
            updateMessage: ""
        }
    },
    methods: {
        async getAllBooks() {
            this.helperGetAndShow(baseUrl)
        },
        async getById(id) {
            const url = baseUrl + "/" + id
            try {
                const response = await axios.get(url)
                this.singleBook = await response.data
            } catch (ex) {
                alert(ex.message)
            }
        },
        async helperGetAndShow(url) {
            try {
                const response = await axios.get(url)
                this.books = await response.data
            }
            catch (ex) {
                alert(ex.message)
            }
        },
        async addBook() {
            const response = await axios.post(baseUrl, this.addBookData)
        },
        async deleteBook(deleteId) {
            const url = baseUrl + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateBook() {
            const url = baseUrl + "/" + this.updateBookData.id
            try {
                response = await axios.put(url, this.updateBookData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllBooks()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")