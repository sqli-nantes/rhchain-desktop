contract RHChain {

    address admin;

    event newResult;
    event over;

    bytes32[3] questions; /* questions hash */
    bytes32[3] answers; /* answers hash */
    
    uint nbSubmission = 0;
    
    mapping( address =>  uint8[3] ) submissions; /* @ --> [idx q1.answer,idx q2.answer, idx q3.answer] */

    uint[3][3] results;

    function RHChain(bytes32[3] quests, bytes32[3] answ){
        admin = msg.sender;
        questions = quests;
        answers = answ;
    }
    
    function submit(uint[3] answ){
        if( msg.sender != admin ){
            
            
            
            newResult();
        }
        
    }
    
    function close(){
        if( msg.sender != admin ) throw;
        
        
        over();
    }
    


}
