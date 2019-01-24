class Converter extends React.Component{

    constructor(props){
        const consonants =  'கஙசஞடணதநபமயரலவழளறனஷஜஸஹ';
        const sampleText= 
            'அகர முதல எழுத்தெல்லாம் ஆதி பகவன் முதற்றே உலகு'+ 
            '\n'+
            '\n'+
            'அஆஇஈஉஊஎஏஐஒஓஔஃ' + '\n'+
            'ஸ்ரீ' +
            'க்ஷ்' +
            'க்ஷெக்ஷேக்ஷொக்ஷோக்ஷௌ' +
            'க்ஷக்ஷா' +
            'க்ஷிக்ஷீக்ஷுக்ஷூ'+
            '\n' + consonants+ '\n'+
            consonants.split('').map(c=> c+'\u0bcd').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bbf').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bc0').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bc1').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bc2').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bbe').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bc6').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bc7').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bc8').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bca').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bcb').join('') + '\n' +
            consonants.split('').map(c=> c+'\u0bcc').join('') + '\n' +
            ''
        ;
        super(props);
        this.state={
            text: sampleText + '\n' ,
        }
        this.updateText = this.updateText.bind(this);
        this.getPreview = this.getPreview.bind(this);

    }
    updateText(event){
        this.setState(
            {
                text: event.target.value,
            }
        );

    }
    getPreview(){
        return convertTamilFont(this.state.text);
    }

    render(){
        return(
            <div className="container">
                <div className="markdown">
                    <textarea id="input-markdown"  rows="30" cols="60" onChange={this.updateText}>{this.state.text}
                    </textarea>
                </div>
                <div className="preview">
                    <div dangerouslySetInnerHTML={{__html: this.getPreview()}}>
                    </div>
                </div>
            </div>

        );
    }
}
ReactDOM.render(<Converter /> , document.querySelector('#root')); 