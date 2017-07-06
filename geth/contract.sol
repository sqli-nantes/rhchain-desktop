pragma solidity ^0.4.9;

contract RHChain {

    address private admin;
    bool[3] private visibilities; /* [q1.visibile,q2.visibile,q3.visibile] */
    address[] private submitters;
    
    mapping( address => bool ) private hasSubmitted;
    mapping( address =>  uint8[3] ) private submissions; /* @ --> [idx q1.answer,idx q2.answer, idx q3.answer] */
    
    int[3][3] private results; /* [nb vote q1.answer1, nb vote q1.answer2, nb vote q1.answer3 ][...] */
    
    /*  State of the survey
        0 : Opened 
        1 : Published
        2 : Closed
    */
    enum SurveyState {Opened,Published,Closed}
    SurveyState public state;
    SurveyState constant defaultState = SurveyState.Opened;
    
    bytes32[3] public questions; /* questions hash */
    bytes32[3] public answers; /* answers hash */
    
    event newResults(int[3][3] results);
    event published(int[3][3] results); /* returns results with visibility. -1 is : not visible */
    event closed();
    event opened();

    modifier onlyAdmin {
        if( msg.sender != admin ) throw;
        _;
    }
    modifier onlyCollab{
        if( msg.sender == admin ) throw;
        _;
    }
    modifier onlyNoSubmission() {
       if( hasSubmitted[msg.sender] ) throw;
       _;
    }
    modifier onlyOpened {
        if( state != SurveyState.Opened ) throw;
        _;
    }
    modifier onlyClosed {
        if( state != SurveyState.Closed ) throw;
        _;
    }
    modifier notClosed{
        if( state == SurveyState.Closed ) throw;
        _;
    }
    modifier onlyPublished {
        if( state != SurveyState.Published ) throw;
        _;
    }
    
    function RHChain(bytes32[3] quests, bytes32[3] answ){
        admin = msg.sender;
        questions = quests;
        answers = answ;
        state = defaultState;
    }
    
    function submit(uint8[3] answ) onlyCollab onlyOpened onlyNoSubmission returns(bool){
        
        if( !isSubmissionValid(answ) ) throw;
        
        submissions[msg.sender] = answ;
        hasSubmitted[msg.sender] = true;
        submitters.push(msg.sender);
        
        for(uint8 i=0;i<results.length;i++){
            results[i][answ[i]]++;
        }
        
        newResults(results);
        return true;
    }
    
    function publish(bool[3] _visibilities) onlyAdmin onlyOpened returns(bool){
        visibilities = _visibilities;
        state = SurveyState.Published;
        published(resultsWithVisibilityFilter());
        return true;
    }
    
    function close() onlyAdmin onlyPublished returns(bool) {
        state = SurveyState.Closed;
        cleanState();
        closed();
    }
    
    function open() onlyAdmin onlyClosed returns(bool){
        state = SurveyState.Opened;
        opened();
    }
    
    function mySubmission() onlyCollab notClosed returns(bool,uint8[3]) {
        if( !hasSubmitted[msg.sender] ) return (false,submissions[msg.sender]);
        else return (true,submissions[msg.sender]);
    }
    
    function getResults() notClosed returns(bool, int[3][3] ){
        if( msg.sender == admin ) return (true,results);
        else if( state == SurveyState.Published ) return (true,resultsWithVisibilityFilter());
        else throw;
    }
    
    function getVisibilities() onlyAdmin notClosed returns(bool, bool[3] )  {
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
    function cleanState() private returns(bool){
        for(uint i=0;i<submitters.length;i++){
            address submitter = submitters[i];
            delete hasSubmitted[submitter];
            delete submissions[submitter];
        }
        delete submitters;
        delete results;
        return true;
    }

}
