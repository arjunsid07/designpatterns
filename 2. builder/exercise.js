class CodeBuilder {
    constructor(className) {
        this.className = className;
        this.fields = [];
        // todo
    }

    addField(name) {
        this.fields.push(name);
        // todo
        return this;
        // reminder: we want a fluent interface
    }

    toString() {
        let indent = 2;
        const html = [];
        html.push(`class ${this.className} {\n`);
        if (this.fields.length) {
            html.push(" ".repeat(indent));
            html.push(`constructor(${this.fields.join(", ")}) {\n`);
            indent++;
            for (let index = 0; index < this.fields.length; index++) {
                html.push(`this.${this.fields[index]} = ${this.fields[index]};\n`);
            }
            indent--;
            html.push(" ".repeat(indent));
            html.push(`}\n`);
        }
        html.push("}");
        return html.join("");
        // todo
    }
}
let cb = new CodeBuilder("Person");
// cb.addField("name").addField("age");
console.log(cb.toString());
