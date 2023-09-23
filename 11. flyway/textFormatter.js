/**
 * In FormattedText, we've a separate boolean array to store the capitalization status of each letter
 * So, it's wasting a lot of space
 */
class FormattedText
{
  constructor(plainText)
  {
    this.plainText = plainText;
    this.caps = new Array(plainText.length).map(
      function() { return false; }
    );
  }

  capitalize(start, end)
  {
    for (let i = start; i <= end; ++i)
      this.caps[i] = true;
  }

  toString()
  {
    let buffer = [];
    for (let i in this.plainText)
    {
      let c = this.plainText[i];
      buffer.push(this.caps[i] ? c.toUpperCase() : c);
    }
    return buffer.join('');
  }
}

// this would work better as a nested class
class TextRange
{
  constructor(start, end)
  {
    this.start = start;
    this.end = end;
    this.capitalize = false;
    // other formatting options here
  }

  covers(position)
  {
    return position >= this.start &&
      position <= this.end;
  }
}

/**
 * In BetterFormattedText, We've made another class as TextRange which stores the range of all texts that are formatted
 * in this way, we're saving a lot of space
 */

class BetterFormattedText
{
  constructor(plainText)
  {
    this.plainText = plainText;
    this.formatting = [];
  }

  getRange(start, end)
  {
    let range = new TextRange(start, end);
    this.formatting.push(range);
    return range;
  }

  toString()
  {
    let buffer = [];
    for (let i in this.plainText)
    {
      let c = this.plainText[i];
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize)
          c = c.toUpperCase();
      }
      buffer.push(c);
    }
    return buffer.join('');
  }
}

const text = 'This is a brave new world';
let ft = new FormattedText(text);
ft.capitalize(10, 15);
console.log(ft.toString());

let bft = new BetterFormattedText(text);
bft.getRange(16, 19).capitalize = true;
console.log(bft.toString());