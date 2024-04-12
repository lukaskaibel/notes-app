export class Note {
  constructor(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  display() {
    console.log(
      `ID: ${this.id}, Title: ${this.title}, Content: ${this.content}`
    );
  }
}
