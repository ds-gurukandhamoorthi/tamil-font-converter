const {createToken, tokenMatcher, Lexer, Parser} = chevrotain;

const uVowels = 'அஆஇஈஉஊஎஏஐஒஓஔஃ';
const stmzhVowels = '\uf0b6\uf067\uf0d6\uf07e\uf063\uf0bb\uf0a8\uf0b0\uf06e\uf0ce\uf07b\uf0c1\uf0e0';
console.assert(uVowels.length == stmzhVowels.length, 'Vowels in source and target font not having same number of characters');

const uConsonants = 'கஙசஞடணதநபமயரலவழளறனஷஜஸஹ';
const stmzhConsonants = '\uf0ef\uf0f4\uf0c4\uf051\uf0a6\uf0f0\uf03e\uf0e5\uf0c3\uf05c\uf042\uf0ab\uf0e9\uf06b\uf077\uf065\uf0c5\uf0aa\uf0ad\uf0db\uf076\uf0c7';
console.assert(uConsonants.length == stmzhConsonants.length, 'Consonants in source and target font not having same number of characters');

const unic2stmzhVowels = new Map(R.zipWith((u,s)=> [u,s], uVowels, stmzhVowels));
const unic2stmzhConsonants = new Map(R.zipWith((u,s)=> [u,s], uConsonants, stmzhConsonants))
    .set( 'க்ஷ','\uf0b3'); //Ksha

const unic2stmzhEntities = new Map([...unic2stmzhVowels,
    ...unic2stmzhConsonants,
    ['ஸ்ரீ','\uf070'], //Sri

]);

//\uobcd
const stmzhDottedConsonants = '\uf0c2\uf0ba\uf0df\uf0de\uf0e2\uf0f5\uf0dd\uf0cd\uf0a9\uf044\uf046\uf0ec\uf05f\uf0cb\uf0b5\uf05e\uf075\uf05b\uf069\uf0eb\uf0fc\uf0e3';
console.assert(uConsonants.length == stmzhDottedConsonants.length, 'Dotted Consonants in source and target font not having same number of characters');
const unic2stmzhDots = new Map(R.zipWith((u,s)=> [u+'\u0bcd',s], uConsonants, stmzhDottedConsonants))
    .set('க'+'\u0bcd'+ 'ஷ'+ '\u0bcd','\uf0d5');

//Stmzh font doesn't have some not-so-frequent letters : composed letters of ங ஞ : ஙிஞி ஙீஞீ ஙுஞு ஙூஞூ
const uConsonantsWithout2Excep = 'கசடணதநபமயரலவழளறனஷஜஸஹ';

const stmzhIKurilConsonants = '\uf0fe\uf045\uf0bd\uf0e8\uf05d\uf057\uf0b8\uf074\uf06c\uf0f6\uf06f\uf073\uf061\uf0b9\uf0a4\uf04d\uf0b4\uf0f7\uf04c\uf04e';
console.assert(uConsonantsWithout2Excep.length == stmzhIKurilConsonants.length, 'I kuril Consonants in source and target font not having same number of characters');
const unic2stmzhIKuril = new Map(R.zipWith((u,s)=> [u+'\u0bbf',s], uConsonantsWithout2Excep, stmzhIKurilConsonants))
    .set('க'+'\u0bcd'+ 'ஷ'+ '\u0bbf','\uf048');

const stmzhINedilConsonants = '\uf0ff\uf0e6\uf0cf\uf0a7\uf079\uf0c0\uf0ac\uf02a\uf058\uf05a\uf0dc\uf054\uf0d1\uf043\uf053\uf0cc\uf055\uf0fd\uf0a2\uf0ea';
console.assert(uConsonantsWithout2Excep.length == stmzhINedilConsonants.length, 'I nedil Consonants in source and target font not having same number of characters');
const unic2stmzhINedil = new Map(R.zipWith((u,s)=> [u+'\u0bc0',s], uConsonantsWithout2Excep, stmzhINedilConsonants))
    .set('க'+'\u0bcd'+ 'ஷ'+ '\u0bc0','\uf0c8');

const stmzhUKurilConsonants = '\uf07a\uf0b7\uf07c\uf062\uf06d\uf04f\uf041\uf078\uf0a5\uf0f2\uf04b\uf0a1\uf0bf\uf0d3\uf0ae\uf0d0\uf0d7\uf068\uf071\uf0f8';
console.assert(uConsonantsWithout2Excep.length == stmzhUKurilConsonants.length, 'U kuril Consonants in source and target font not having same number of characters');
const unic2stmzhUKuril = new Map(R.zipWith((u,s)=> [u+'\u0bc1',s], uConsonantsWithout2Excep, stmzhUKurilConsonants))
    .set('க'+'\u0bcd'+ 'ஷ'+ '\u0bc1','\uf059');

const stmzhUNedilConsonants = '\uf0ed\uf0f3\uf0f9\uf049\uf023\uf0b1\uf0af\uf04a\uf052\uf0d4\uf0d9\uf0c6\uf0f1\uf06a\uf047\uf0fb\uf0a3\uf0c9\uf060\uf0da';
console.assert(uConsonantsWithout2Excep.length == stmzhUNedilConsonants.length, 'U nedil Consonants in source and target font not having same number of characters');
const unic2stmzhUNedil = new Map(R.zipWith((u,s)=> [u+'\u0bc2',s], uConsonantsWithout2Excep, stmzhUNedilConsonants))
    .set('க'+'\u0bcd'+ 'ஷ'+ '\u0bc2','\uf066');

const markTransforms = {
    '\u0bbe': c => unic2stmzhConsonants.get(c) + '\uf056', // A nedil

    '\u0bc6': c => '\uf0d8' + unic2stmzhConsonants.get(c),  // E kuril
    '\u0bc7': c => '\uf0bc' + unic2stmzhConsonants.get(c),  // E Nedil
    '\u0bc8': c => '\uf0e7' + unic2stmzhConsonants.get(c),  // AI

    '\u0bca': c => '\uf0d8' + unic2stmzhConsonants.get(c) + '\uf056',  // O kuril
    '\u0bcb': c => '\uf0bc' + unic2stmzhConsonants.get(c) + '\uf056',  // O nedil
    '\u0bcc': c => '\uf0d8' + unic2stmzhConsonants.get(c) + '\uf065',  // O nedil
};

//Calculate table/hash to speed up
const uComposedChars = R.map(R.join(''), R.xprod(uConsonants, R.keys(markTransforms)));
const stmzhComposedChars = R.map(R.ap(R.values(markTransforms)), uConsonants).flat();

const uComposedKsha = R.map(R.join(''), R.xprod(['க்ஷ'], R.keys(markTransforms))); 
const stmzhComposedKsha = R.ap(R.values(markTransforms), ['க்ஷ'])

const unic2stmzhComposedChars = new Map(R.zipWith((u,s)=> [u ,s], R.concat(uComposedChars, uComposedKsha) , R.concat(stmzhComposedChars, stmzhComposedKsha)));




const unic2stmzhRidingEntities = new Map([...unic2stmzhDots, ...unic2stmzhIKuril, ...unic2stmzhINedil, ...unic2stmzhUKuril, ...unic2stmzhUNedil]);

const All = createToken({name: 'All', pattern:/./});
const Sri = createToken({name: 'Sri', pattern:/ஸ்ரீ/});
const Vowel = createToken({name: 'Vowel', pattern:/[அஆஇஈஉஊஎஏஐஒஓஔஃ]/});
const Consonant = createToken({name: 'Consonant', pattern:/க்ஷ|[கஙசஞடணதநபமயரலவழளறனஷஜஸஹ]/});
const RidingMark = createToken({name: 'RidingMark', pattern:/\u0bcd|\u0bbf|\u0bc0|\u0bc1|\u0bc2/}); //Aka Combining Mark in Unicode: pulli_ta (A kuril), I kuril, I nedil, U kuril, U nedil
const PrecedingMark = createToken({name: 'PrecedingMark', pattern: /\u0bc6|\u0bc7|\u0bc8/}); // E kuil E nedil AI
const FollowingMark = createToken({name: 'FollowingMark', pattern:/\u0bbe/}); // A nedil
const PrecedingAndFollowingMark = createToken({name: 'PrecedingAndFollowingMark', pattern:/\u0bca|\u0bcb|\u0bcc/}); //O kuril, O nedil, AU

const WhiteSpace = createToken({name: 'WhiteSpace', pattern:/\s+/});

const newLine = createToken({name: 'newLine', pattern:/\n/});

const allTokens = [newLine, WhiteSpace, Sri, Vowel, RidingMark, PrecedingMark, FollowingMark, PrecedingAndFollowingMark ,Consonant, All];

const UnicodeToStmzhLexer = new Lexer(allTokens);

class UnicodeToStmzhConverter extends Parser{
    constructor(){
        super(allTokens, {outputCst: false});
        const $ = this;
        $.RULE('text', () => {
            let res = '';
            $.MANY(()=>{
                let charac = $.OR([
                    {ALT: ()  => $.SUBRULE($.composedEntity)},
                    // {ALT: () => $.SUBRULE($.specialComposedEntity)},
                    {ALT: ()  => $.SUBRULE($.separateEntity)},
                    {ALT: ()  => $.SUBRULE($.lineBreak)},
                    {ALT: ()  => $.SUBRULE($.notTranslatable)},
                ]);
                res += charac;
            });
            return(res);
        });
        $.RULE('separateEntity', ()=>{
            let charac= $.OR([
                {ALT: () => $.CONSUME(Vowel)},
                {ALT: () => $.CONSUME(Consonant)},
                {ALT: () => $.CONSUME(Sri)},
            ]);
            let mark;
            $.OPTION(()=>{
                mark = $.CONSUME(RidingMark);
            });
            if (mark == null){
                if (unic2stmzhEntities.has(charac.image)){
                    return(unic2stmzhEntities.get(charac.image));
                }
            }
            if (unic2stmzhRidingEntities.has(charac.image + mark.image)){
                return(unic2stmzhRidingEntities.get(charac.image + mark.image));
            }
            return(charac.image +(mark? mark.image : ''));
        });
        $.RULE('lineBreak', ()=>{ //FIXME
            let charac = $.CONSUME(newLine);
            return ('<br/>');
        });
        $.RULE('composedEntity', ()=>{ //FIXME
            let charac = $.CONSUME(Consonant);
            let mark = $.OR([
                {ALT: () => $.CONSUME(PrecedingMark)},
                {ALT: () => $.CONSUME(FollowingMark)},
                {ALT: () => $.CONSUME(PrecedingAndFollowingMark)},
            ]);
            return(unic2stmzhComposedChars.get(charac.image+mark.image));
        });
        $.RULE('notTranslatable', ()=>{ //not Translatable meaning : not having an equivalent encoding in the target font
            let characs = $.OR([
                {ALT: () => $.CONSUME(RidingMark)}, //When along: dangling Mark
                {ALT: () => $.CONSUME(PrecedingMark)}, //When along: dangling Mark
                {ALT: () => $.CONSUME(FollowingMark)}, //When along: dangling Mark
                {ALT: () => $.CONSUME(PrecedingAndFollowingMark)}, //When along: dangling Mark
                {ALT: () => $.CONSUME(WhiteSpace)},
                {ALT: () => $.CONSUME(All)},
            ]);
            return (characs.image);
        });

        this.performSelfAnalysis();
    }
}

const parserInstance = new UnicodeToStmzhConverter();
