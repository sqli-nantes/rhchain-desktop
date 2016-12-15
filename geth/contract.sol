contract RHChain {

    address private admin;
    bool[3] private visibilities; /* [q1.visibile,q2.visibile,q3.visibile] */
    mapping( address => bool ) private hasSubmitted;
    mapping( address =>  uint8[3] ) private submissions; /* @ --> [idx q1.answer,idx q2.answer, idx q3.answer] */
    int[3][3] private results; /* [nb vote q1.answer1, nb vote q1.answer2, nb vote q1.answer3 ][...] */
    
    bool public closed = false;
    bytes32[3] public questions; /* questions hash */
    bytes32[3] public answers; /* answers hash */
    
    event newResults(int[3][3] results);
    event over(int[3][3] results); /* returns results with visibility. -1 is : not visible */

    modifier onlyAdmin {
        if( msg.sender != admin ) throw;
        _;
    }
    modifier onlyCollab{
        if( msg.sender == admin ) throw;
        _;
    }
    modifier onlyOnce{
       if( hasSubmitted[msg.sender] ) throw;
       _;
    }
    modifier onlyOpened {
        if( closed ) throw;
        _;
    }
    
    function RHChain(bytes32[3] quests, bytes32[3] answ){
        admin = msg.sender;
        questions = quests;
        answers = answ;
    }
    
    function submit(uint8[3] answ) onlyOpened onlyCollab onlyOnce returns(bool){
        
        if( !isSubmissionValid(answ) ) throw;
        
        submissions[msg.sender] = answ;
        hasSubmitted[msg.sender] = true;
        
        for(uint8 i=0;i<results.length;i++){
            results[i][answ[i]]++;
        }
        
        newResults(results);
        return true;
    }
    
    function close(bool[3] _visibilities) onlyAdmin onlyOpened returns(bool){
        visibilities = _visibilities;
        closed = true;
        over(resultsWithVisibilityFilter());
        return true;
    }
    
    function mySubmission() returns(bool,uint8[3]) {
        if( msg.sender == admin ) throw;
        if( !hasSubmitted[msg.sender] ) throw;
        else return (true,submissions[msg.sender]);
    }
    
    function getResults() returns(bool, int[3][3] ){
        if( msg.sender == admin ) return (true,results);
        else if( closed ) return (true,resultsWithVisibilityFilter());
        else throw;
    }
    
    function getVisibilities() onlyAdmin returns(bool, bool[3] )  {
        return (true,visibilities);
    }
    
    function isSubmissionValid(uint8[3] sub) private returns (bool){
        for(uint i=0;i<sub.length;i++){
            if( sub[i]<0 || sub[i] > 2 ) return false;
        }
        return true;
    }
    function resultsWithVisibilityFilter() private returns(int[3][3] ret) {
        ret = results;
        
        for(uint8 i=0;i<results.length;i++){
            if( !visibilities[i] ){
                for( uint8 j=0 ; j<results.length ; j++){
                    ret[i][j] =-1;
                }
        }   }
    }

}
