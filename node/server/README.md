# API exposé

## /API/QUESTIONS

    GET : /api/questions/   retourne l'ensemble des questions

    GET : /api/questions/{id}   Retourne la question correspondant à l'id passé en paramètre

## /API/users
    GET : /api/users/
        retourne l'ensemble des utilisateurs inscrit

    POST : /api/users/
        headers : Content-Type:application/json
        body : {"mail":"[MAIL]","adress":[ADRESS]}

    GET : /api/users/{id}
       Retourne l'utilisateur recherché

    GET : /api/users/{id}/adress
         Retourne l'adresse Blockchain de l'utilisateur recherché
