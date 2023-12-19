const express = require('express')
const app = express()
// app.listen(3000, () => {
//     console.log('http://localhost:3000/')
// })

//TEST DE MODIFICATION

const mysql = require('mysql2');
const connection = mysql.createConnection({
	host:'https://databases.000webhost.com/index.php',
	user:'id21691480_phonerelax',
	password:'12ff663S!',
	database:'id21691480_prx'
});



//=============================================GET LES INFOS=============================================
app.get("/stocks",(req,res) => {
    const i=req.query.id;
    const l=req.query.libelle;
    const lre=req.query.libelle_refinterne_ean;
    const r=req.query.rachat;
    const ra=req.query.rach;
    const ean=req.query.ean;
    const c=req.query.categorie;
    const sc=req.query.souscategorie;
    if(i != null) //voir si on met un parametre avec blablabla ?id=1
    {
        connection.query(`SELECT * FROM stocks WHERE idStock = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if (l != null){
        connection.query(`SELECT * FROM stocks WHERE libelleStock LIKE '%${l}%' OR EANStock LIKE '%${l}%'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if (ra != null){
        connection.query(`SELECT * FROM stocks WHERE rachatStock = '${ra}' AND EANStock = '${ean}'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM stocks WHERE (libelleStock LIKE '%${lre}%' OR refInterneStock LIKE '%${lre}%' OR EANStock LIKE '%${lre}%') AND rachatStock LIKE '%${r}%' AND categorie LIKE '%${c}%' AND sousCategorie LIKE '%${sc}%'`, (err,rows) =>
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/magasins",(req,res) => {
    const i=req.query.id;
    if(i){
        connection.query(`SELECT * FROM magasins WHERE idMagasin=${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM magasins ORDER BY idMagasin ASC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/categories",(req,res) => {
    connection.query(`SELECT * FROM categories`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/souscategories",(req,res) => {
    connection.query(`SELECT * FROM souscategories`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/quantites",(req,res) => {
    const m=req.query.magasin;
    if(m){
        connection.query(`SELECT * FROM quantites WHERE magasin = ${m}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM quantites ORDER BY magasin ASC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/clients",(req,res) => {
    const i=req.query.id;
    const np=req.query.nomPrenom;
    const t=req.query.tel;
    const cp=req.query.codePostal;

    if(i != null) //voir si on met un parametre avec blablabla ?id=1
    {
        connection.query(`SELECT * FROM clients WHERE idClient = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(np != null && t == null && cp == null){
        connection.query(`SELECT * FROM clients WHERE nomClient LIKE '%${np}%' OR prenomClient LIKE '%${np}%'`, (err,rows) =>
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM clients WHERE (nomClient LIKE '%${np}%' OR prenomClient LIKE '%${np}%') AND telClient LIKE '%${t}%' AND codePostalClient LIKE '%${cp}%'`, (err,rows) =>
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/comptes",(req,res) => {
    const i=req.query.id;
    const np=req.query.nomPrenom;
    const m=req.query.magasin;
    const h=req.query.habilitation;
    
    if(i != null) //voir si on met un parametre avec blablabla ?id=1
    {
        connection.query(`SELECT * FROM comptes WHERE idCompte = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(np != null || m != null || h != null)
    {
        connection.query(`SELECT * FROM comptes WHERE (nomCompte LIKE '%${np}%' OR prenomCompte LIKE '%${np}%') AND magasin LIKE '%${m}%' AND niveauHabilitationCompte LIKE '%${h}%'`, (err,rows) =>
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM comptes`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/habilitations",(req,res) => {
    connection.query(`SELECT * FROM habilitations`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/demandes",(req,res) => {
    const i=req.query.id;
    const s=req.query.statut;
    const c=req.query.categorie;
    const m=req.query.magasin;
    const co=req.query.cout;
    if(i != null) //voir si on met un parametre avec blablabla ?id=1
    {
        connection.query(`SELECT * FROM demandes WHERE idDemande = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM demandes WHERE statut LIKE '%${s}%' AND categorie LIKE '%${c}%' AND magasin LIKE '%${m}%' AND coutDemande LIKE '%${co}%' ORDER BY idDemande DESC`, (err,rows) =>
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/statuts",(req,res) => {
    connection.query(`SELECT * FROM statuts`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/etats",(req,res) => {
    connection.query(`SELECT * FROM etats`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/ventespec",(req,res) => {
    const i=req.query.id;
    const r=req.query.reference;
    const np=req.query.nomPrenom;
    const m=req.query.magasin;
    const e=req.query.etat;
    const mo=req.query.modele;
    const re=req.query.recherche;
    if(i){
        connection.query(`SELECT * FROM pecventes INNER JOIN clients ON pecventes.client = clients.idClient INNER JOIN modeles ON pecventes.modele = modeles.idModele WHERE idPECVente=${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(r){
        connection.query(`SELECT * FROM pecventes INNER JOIN clients ON pecventes.client = clients.idClient INNER JOIN modeles ON pecventes.modele = modeles.idModele WHERE referencePECVente='${r}'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(re){
        connection.query(`SELECT * FROM pecventes INNER JOIN clients ON pecventes.client = clients.idClient INNER JOIN modeles ON pecventes.modele = modeles.idModele WHERE referencePECVente LIKE '%${re}%' OR (nomClient LIKE '%${re}%' OR prenomClient LIKE '%${re}%')`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT DISTINCT idPECVente, prixTTCRestantPECVente, oxydePECVente, importantPECVente, referencePECVente, datePECVente, client, magasin, descriptionPECVente, codePECVente, IMEIPECVente,libelleModele, etat, type, prixTTCPECVente, nomClient, prenomClient, accessoiresPECVente, telClient FROM pecventes 
        INNER JOIN clients ON pecventes.client = clients.idClient 
        INNER JOIN articlespecventes ON pecventes.idPECVente = articlespecventes.PECVente
        INNER JOIN modeles ON pecventes.modele = modeles.idModele
        WHERE (nomClient LIKE '%${np}%' OR prenomClient LIKE '%${np}%') AND magasin LIKE '%${m}%' AND etat LIKE '%${e}%' AND libelleModele LIKE '%${mo}%' ORDER BY idPECVente DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/ventesv",(req,res) => {
    const i=req.query.id;
    const r=req.query.reference;
    const np=req.query.nomPrenom;
    const m=req.query.magasin;
    const e=req.query.etat;
    const l=req.query.stock;
    const re=req.query.recherche;
    if(i){
        connection.query(`SELECT * FROM vventes WHERE idVente=${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(r){
        connection.query(`SELECT * FROM vventes INNER JOIN clients ON vventes.client = clients.idClient WHERE referenceVVente='${r}'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(re){
        connection.query(`SELECT * FROM vventes INNER JOIN clients ON vventes.client = clients.idClient WHERE referenceVVente LIKE'%${re}%' OR (nomClient LIKE '%${re}%' OR prenomClient LIKE '%${re}%') `, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT DISTINCT idVente, prixTTCRestantVVente, referenceVVente, dateVVente, client, magasin, etat, type, prixTTCVVente, nomClient, prenomClient, telClient FROM vventes
        INNER JOIN clients ON vventes.client = clients.idClient 
        INNER JOIN articlesvventes ON articlesvventes.VVente = vventes.idVente 
        INNER JOIN stocks ON articlesvventes.stock = stocks.idStock 
        WHERE (nomClient LIKE '%${np}%' OR prenomClient LIKE '%${np}%') AND magasin LIKE '%${m}%' AND etat LIKE '%${e}%' AND libelleStock LIKE '%${l}%' ORDER BY idVente DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/reglementspecventes",(req,res) => {
    const i=req.query.id;
    const p=req.query.PECVente;
    const d=req.query.date;
    if(i){
        connection.query(`SELECT * FROM reglementspecventes WHERE idReglement = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(p)
    {
        connection.query(`SELECT * FROM reglementspecventes WHERE PECVente = ${p} ORDER BY idReglement DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(d){
        connection.query(`SELECT * FROM reglementspecventes INNER JOIN pecventes ON reglementspecventes.PECVente = pecventes.idpecVente WHERE dateReglement LIKE '%${d}%' ORDER BY idReglement DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM reglementspecventes ORDER BY idReglement DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/reglementsvventes",(req,res) => {
    const i=req.query.id;
    const v=req.query.VVente;
    const d=req.query.date;
    if(i){
        connection.query(`SELECT * FROM reglementsvventes WHERE idReglement = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(v)
    {
        connection.query(`SELECT * FROM reglementsvventes WHERE VVente = ${v}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(d){
        connection.query(`SELECT * FROM reglementsvventes INNER JOIN vventes ON reglementsvventes.VVente = vventes.idVente WHERE dateReglement LIKE '%${d}%' ORDER BY idReglement`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM reglementsvventes`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/articlesvventes",(req,res) => {
    i = req.query.id;
    s = req.query.idSAV;
    if(i)
    {
        connection.query(`SELECT * FROM articlesvventes LEFT JOIN stocks ON articlesvventes.stock = stocks.idStock LEFT JOIN promotions ON articlesvventes.promotion = promotions.idPromotion LEFT JOIN modeles ON articlesvventes.modele = modeles.idModele WHERE VVente = ${i} ORDER BY idArticle`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(s){
        connection.query(`SELECT stocks.garantie as garantieStock, modeles.garantie as garantieModele FROM articlesvventes LEFT JOIN stocks ON articlesvventes.stock = stocks.idStock LEFT JOIN promotions ON articlesvventes.promotion = promotions.idPromotion LEFT JOIN modeles ON articlesvventes.modele = modeles.idModele WHERE idArticle = ${s} ORDER BY idArticle`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM articlesvventes LEFT JOIN stocks ON articlesvventes.stock = stocks.idStock LEFT JOIN promotions ON articlesvventes.promotion = promotions.idPromotion LEFT JOIN modeles ON articlesvventes.modele = modeles.idModele ORDER BY idArticle`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/articlespecventes",(req,res) => {
    i = req.query.id;
    s = req.query.idSAV;
    if(i){
        connection.query(`SELECT * FROM articlespecventes LEFT JOIN stocks ON articlespecventes.stock = stocks.idStock LEFT JOIN promotions ON articlespecventes.promotion = promotions.idPromotion LEFT JOIN modeles ON articlespecventes.modele = modeles.idModele WHERE PECVente = ${i} ORDER BY idArticle`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(s){
        connection.query(`SELECT stocks.garantie as garantieStock, modeles.garantie as garantieModele FROM articlespecventes LEFT JOIN stocks ON articlespecventes.stock = stocks.idStock LEFT JOIN promotions ON articlespecventes.promotion = promotions.idPromotion LEFT JOIN modeles ON articlespecventes.modele = modeles.idModele WHERE idArticle = ${s} ORDER BY idArticle`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM articlespecventes LEFT JOIN stocks ON articlespecventes.stock = stocks.idStock LEFT JOIN promotions ON articlespecventes.promotion = promotions.idPromotion LEFT JOIN modeles ON articlespecventes.modele = modeles.idModele ORDER BY idArticle`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    
});
app.get("/modeles",(req,res) => {
    l=req.query.libelle;
    if(l)
    {
        connection.query(`SELECT * FROM modeles WHERE libelleModele LIKE '%${l}%'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else
    {
        connection.query(`SELECT * FROM modeles`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/avoirs",(req,res) => {
    c=req.query.code;
    if(c){
        connection.query(`SELECT * FROM avoirs WHERE idAvoir LIKE '%${c}%'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM avoirs`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/promotions",(req,res) => {
    const l = req.query.libelle;
    connection.query(`SELECT * FROM promotions WHERE libellePromotion LIKE '%${l}%'`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/sav",(req,res) => {
    const i = req.query.id;
    const m = req.query.magasin;
    const e = req.query.etat;
    const c = req.query.client;
    const r = req.query.reference;
    const ref = req.query.referencesav;
    const re = req.query.recherche;

    if(i)
    {
        connection.query(`SELECT idSAV, referenceSAV, dateSAV, sav.etat, sav.stock, sav.magasin, sav.modele, descriptionSAV, dossierChaudSAV, PECVente, VVente, referencePECVente, referenceVVente, pecventes.client as clientPEC, vventes.client as clientV, sav.magasin FROM sav 
        LEFT JOIN pecventes ON sav.PECVente = pecventes.idPECVente 
        LEFT JOIN vventes ON sav.VVente = vventes.idVente
        WHERE idSAV = ${i} ORDER BY idSAV desc`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(ref){
        connection.query(`SELECT idSAV, referenceSAV, dateSAV, sav.etat, sav.stock, sav.magasin, sav.modele, descriptionSAV, dossierChaudSAV, PECVente, VVente, referencePECVente, referenceVVente, pecventes.client as clientPEC, vventes.client as clientV, sav.magasin, codeV FROM sav 
        LEFT JOIN pecventes ON sav.PECVente = pecventes.idPECVente 
        LEFT JOIN vventes ON sav.VVente = vventes.idVente
        WHERE referenceSAV LIKE '%${ref}%'`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else if(re){
        connection.query(`SELECT idSAV, referenceSAV, nomClient, prenomClient, dateSAV, sav.etat, sav.stock, sav.magasin, sav.modele, descriptionSAV, dossierChaudSAV, PECVente, VVente, referencePECVente, referenceVVente, pecventes.client as clientPEC, vventes.client as clientV, sav.magasin, codeV FROM sav 
        LEFT JOIN pecventes ON sav.PECVente = pecventes.idPECVente 
        LEFT JOIN vventes ON sav.VVente = vventes.idVente
        INNER JOIN clients ON pecventes.client = clients.idClient OR vventes.client = clients.idClient
        WHERE referenceSAV LIKE '%${re}%' OR (nomClient LIKE '%${re}%' OR prenomClient LIKE '%${re}%')`, (err,rows) =>
        {
            if(!err) res.send(rows);
        })
    }
    else if(m != null || e != null || c != null || r != null){
        connection.query(`SELECT idSAV, referenceSAV, dateSAV, sav.etat, sav.stock, sav.magasin, sav.modele, descriptionSAV, dossierChaudSAV, PECVente, VVente, referencePECVente, referenceVVente, pecventes.client as clientPEC, vventes.client as clientV, sav.magasin, codeV FROM sav 
        LEFT JOIN pecventes ON sav.PECVente = pecventes.idPECVente 
        LEFT JOIN vventes ON sav.VVente = vventes.idVente
        WHERE (pecventes.magasin LIKE '%${m}%' OR vventes.magasin LIKE '%${m}%')
        AND sav.etat LIKE '%${e}%'
        AND (pecventes.client LIKE '%${c}%' OR vventes.client LIKE '%${c}%')
        AND (referencePECVente LIKE '%${r}%' OR referenceVVente LIKE '%${r}%' OR referenceSAV LIKE '%${r}%') ORDER BY idSAV desc`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM sav ORDER BY idSAV desc`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/garanties",(req,res) => {
    const l = req.query.libelle;
    connection.query(`SELECT * FROM garanties`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
app.get("/articlessav",(req,res) => {
    i = req.query.idSAV;
    if(i)
    {
        connection.query(`SELECT * FROM articlessav INNER JOIN stocks ON articlessav.stock = stocks.idStock WHERE sav = ${i} `, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
    else{
        connection.query(`SELECT * FROM articlessav INNER JOIN stocks ON articlessav.stock = stocks.idStock`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/historiquespec",(req,res) => {
    p = req.query.pec;
    if(p)
    {
        connection.query(`SELECT * FROM historiquespec WHERE PECVente = ${p} ORDER BY idHistorique DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/historiquessav",(req,res) => {
    s = req.query.sav;
    if(s)
    {
        connection.query(`SELECT * FROM historiquessav WHERE SAV = ${s} ORDER BY idHistorique DESC`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }
});
app.get("/factures",(req,res) => {
    const i = req.query.id;
    let r = req.query.reference;
    let c = req.query.client;
    let d = req.query.date;
    let e = req.query.etat;
    let m = req.query.magasin;

    if(r == undefined) r="";
    if(c == undefined) c="";
    if(d == undefined) d="";
    if(e == undefined) e="";
    if(m == undefined) m="";

    if(i){
        connection.query(`SELECT idFacture, dateFacture, referenceFacture, telClient, nomClient, prenomClient, PECVente, VVente, referencePECVente, referenceVVente, prixTTCRestantPECVente, prixTTCRestantVVente,pecventes.client as clientPEC, vventes.client as clientV, pecventes.etat as etatPEC, vventes.etat as etatV, prixTTCPECVente, prixTTCVVente, pecventes.magasin as magasinPEC, vventes.magasin as magasinV FROM factures 
        LEFT JOIN pecventes ON factures.PECVente = pecventes.idPECVente 
        LEFT JOIN vventes ON factures.VVente = vventes.idVente
        INNER JOIN clients ON pecventes.client = clients.idClient OR vventes.client = clients.idClient 
        WHERE idFacture = ${i}`, (err,rows) => 
        {
            if(!err) res.send(rows);
        })
    }   
    else{
        connection.query(`SELECT idFacture, dateFacture, referenceFacture, nomClient, prenomClient, PECVente, VVente, referencePECVente, referenceVVente, prixTTCRestantPECVente, prixTTCRestantVVente,pecventes.client as clientPEC, vventes.client as clientV, pecventes.etat as etatPEC, vventes.etat as etatV, prixTTCPECVente, prixTTCVVente, pecventes.magasin as magasinPEC, vventes.magasin as magasinV FROM factures 
        LEFT JOIN pecventes ON factures.PECVente = pecventes.idPECVente 
        LEFT JOIN vventes ON factures.VVente = vventes.idVente
        INNER JOIN clients ON pecventes.client = clients.idClient OR vventes.client = clients.idClient
        WHERE (referenceFacture LIKE '%${r}%' OR referencePECVente LIKE '%${r}%' OR referenceVVente LIKE '%${r}%') AND (nomClient LIKE '%${c}%' OR prenomClient LIKE '%${c}%') AND (pecventes.magasin LIKE '%${m}%' OR vventes.magasin LIKE '%${m}%') AND (pecventes.etat LIKE '%${e}%' OR vventes.etat LIKE '%${e}%') AND dateFacture LIKE '%${d}%'
        ORDER BY idFacture DESC`, (err,rows) =>
        {
            if(!err) res.send(rows);
            else res.send(err);
        })
    }
});

//=============================================ADD LES INFOS=============================================
app.get("/stocks/add",(req,res) => {
    const l=req.query.libelle;
    const ri=req.query.refInterne;
    const e=req.query.EAN;
    const puht=req.query.prixUniHorsTaxe;
    const pu=req.query.prixUni;
    const pt=req.query.prixTTC;
    const r=req.query.rachat;
    const c=req.query.categorie;
    const sc=req.query.sousCategorie;

    connection.query(`INSERT INTO stocks (libelleStock, refInterneStock, EANStock, prixUnitaireStock, prixUnitaireHorsTaxeStock, prixTTCStock, rachatStock, categorie, sousCategorie, quantiteTotalStock) VALUES ('${l}','${ri}','${e}','${pu}','${puht}','${pt}','${r}','${c}','${sc}', 0)`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/clients/add",(req,res) => {
    const n=req.query.nom;
    const p=req.query.prenom;
    const t=req.query.tel;
    const a=req.query.adresse;
    const cp=req.query.codePostal;
    const v=req.query.ville;
    const ddn=req.query.dateDeNaissance;
    const m=req.query.mail;

    connection.query(`INSERT INTO clients (nomClient, prenomClient, telClient, adresseClient, codePostalClient, villeClient, dateDeNaissanceClient, pointClient, niveauAbonnementClient, mailClient) VALUES ('${n}','${p}','${t}','${a}','${cp}','${v}','${ddn}',0 ,0 ,'${m}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/comptes/add",(req,res) => {
    const n=req.query.nom;
    const p=req.query.prenom;
    const m=req.query.magasin;
    const i=req.query.identifiant;
    const mdp=req.query.motDePasse;
    const h=req.query.habilitation;

    connection.query(`INSERT INTO comptes (nomCompte, prenomCompte, magasin, identifiantCompte, motDePasseCompte, niveauHabilitationCompte) VALUES ('${n}','${p}','${m}','${i}','${mdp}','${h}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/demandes/add",(req,res) => {
    const c=req.query.categorie;
    const d=req.query.description;
    const co=req.query.cout;
    const m=req.query.magasin;
    const r=req.query.rachat;
    const con=req.query.compte;

    connection.query(`INSERT INTO demandes (categorie, descriptionDemande, coutDemande, magasin, rachatDemande, compte, statut) VALUES ('${c}','${d}','${co}','${m}','${r}','${con}','1')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/ventepec/add",(req,res) => {
    const id=req.query.id;
    const c=req.query.client;
    const m=req.query.modele;
    const d=req.query.description;
    const co=req.query.code;
    const p=req.query.prix;
    const i=req.query.IMEI;
    const da=req.query.date;
    const ma=req.query.magasin;
    const r=req.query.reference;
    const a=req.query.accessoires;
    const o=req.query.oxyde;
    const im=req.query.important;

    connection.query(`INSERT INTO pecventes (idPECVente, client, modele, descriptionPECVente,codePECVente, prixTTCPECVente, IMEIPECVente, etat, datePECVente, magasin, referencePECVente, type, accessoiresPECVente, oxydePECVente, importantPECVente) VALUES ('${id}','${c}','${m}','${d}','${co}','${p}','${i}', 8,'${da}','${ma}','${r}', 2, '${a}', '${o}', '${im}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/ventev/add",(req,res) => {
    const i=req.query.id;
    const r=req.query.reference;
    const d=req.query.date;
    const c=req.query.client;
    const m=req.query.magasin;
    const p=req.query.prix;
    
    connection.query(`INSERT INTO vventes (idVente, referenceVVente, dateVVente, client, magasin, etat, type, prixTTCVVente) VALUES ('${i}','${r}','${d}','${c}','${m}',9,1,'${p}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/reglementsventepec/add",(req,res) => {
    const id=req.query.id;
    const r=req.query.reglement;
    const p=req.query.prix;
    const d=req.query.date;
    
    connection.query(`INSERT INTO reglementspecventes (PECVente, libelleReglement, prixReglement, dateReglement) VALUES ('${id}','${r}','${p}','${d}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/reglementsventev/add",(req,res) => {
    const id=req.query.id;
    const r=req.query.reglement;
    const p=req.query.prix;
    const d=req.query.date;
    
    connection.query(`INSERT INTO reglementsvventes (VVente, libelleReglement, prixReglement, dateReglement) VALUES ('${id}','${r}','${p}','${d}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/articlesvventes/add",(req,res) => {
    const v=req.query.vvente;
    const s=req.query.stock;
    const m=req.query.modele;
    const p=req.query.promotion;
    const i=req.query.imei;

    connection.query(`INSERT INTO articlesvventes (VVente, stock, modele, promotion, IMEIArticleVVente) VALUES ('${v}','${s}','${m}','${p}','${i}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/articlespecventes/add",(req,res) => {
    const pe=req.query.pecvente;
    const s=req.query.stock;
    const m=req.query.modele;
    const p=req.query.promotion;
    const i=req.query.imei;

    connection.query(`INSERT INTO articlespecventes (PECVente, stock, modele, promotion, IMEIArticlePECVente) VALUES ('${pe}','${s}','${m}','${p}','${i}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/quantites/add",(req,res) => {
    const s=req.query.stock;
    const m=req.query.magasin;
    const nq=req.query.nombreQuantite;

    connection.query(`INSERT INTO quantites (stock, magasin, nombreQuantite) VALUES ('${s}','${m}','${nq}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/avoirs/add",(req,res) => {
    const p=req.query.prix;

    connection.query(`INSERT INTO avoirs (prixAvoir) VALUES ('${p}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/sav/add",(req,res) => {
    const i=req.query.id;
    const r=req.query.reference;
    const d=req.query.dateSAV;
    const s=req.query.stock;
    const m=req.query.magasin;
    const mo=req.query.modele;
    const de=req.query.description;
    const dc=req.query.dossierChaud;
    const p=req.query.pec;
    const v=req.query.v;
    const c=req.query.code;

    connection.query(`INSERT INTO sav (idSAV, referenceSAV, dateSAV, etat, stock, magasin, modele, descriptionSAV, dossierChaudSAV, PECVente, VVente, codeV) VALUES ('${i}','${r}','${d}','11','${s}','${m}','${mo}','${de}','${dc}','${p}','${v}','${c}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/articlessav/add",(req,res) => {
    const sa=req.query.idSAV;
    const s=req.query.stock;

    connection.query(`INSERT INTO articlessav (sav, stock) VALUES ('${sa}','${s}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/historiquespec/add",(req,res) => {
    const p=req.query.pec;
    const l=req.query.libelle;
    const d=req.query.date;

    connection.query(`INSERT INTO historiquespec (libelleHistorique, PECVente, dateHistorique) VALUES ('${l}','${p}','${d}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});
app.get("/historiquessav/add",(req,res) => {
    const s=req.query.sav;
    const l=req.query.libelle;
    const d=req.query.date;

    connection.query(`INSERT INTO historiquessav (libelleHistorique, SAV, dateHistorique) VALUES ('${l}','${s}','${d}')`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
        else console.log(err);
    })
});



//=============================================MOD LES INFOS=============================================
app.get("/quantites/tranfert",(req,res) => {
    const i=req.query.id;
    const a=req.query.magasinactuel;
    const qa=req.query.quantitemagasinactuel;
    const f=req.query.magasinfutur;
    const qf=req.query.quantitemagasinfutur;

    connection.query(`UPDATE quantites SET nombreQuantite = '${qa}' WHERE stock = '${i}' AND magasin = '${a}'`, (err,rows) => 
    {

    })
    
    connection.query(`UPDATE quantites SET nombreQuantite = '${qf}' WHERE stock = '${i}' AND magasin = '${f}'`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});

app.get("/stocks/modify",(req,res) => {
    const i=req.query.id;
    const l=req.query.libelle;
    const ri=req.query.refInterne;
    const e=req.query.ean;
    const c=req.query.categorie;
    const sc=req.query.sousCategorie;

    connection.query(`UPDATE stocks SET libelleStock = '${l}', refInterneStock = '${ri}', EANStock = '${e}', categorie = '${c}', sousCategorie = '${sc}' WHERE idStock = '${i}'`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/clients/modify",(req,res) => {
    const i=req.query.id;
    const n=req.query.nom;
    const p=req.query.prenom;
    const t=req.query.tel;
    const m=req.query.mail;
    const a=req.query.adresse;
    const cp=req.query.codePostal;
    const v=req.query.ville;
    const ddn=req.query.dateDeNaissance;

    connection.query(`UPDATE clients SET nomClient = '${n}', prenomClient = '${p}', telClient = '${t}', mailClient = '${m}', adresseClient = '${a}', codePostalClient = '${cp}', villeClient = '${v}', dateDeNaissanceClient = '${ddn}' WHERE idClient = '${i}'`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/comptes/modify",(req,res) => {
    const i=req.query.id;
    const n=req.query.nom;
    const p=req.query.prenom;
    const m=req.query.magasin;
    const id=req.query.identifiant;
    const mdp=req.query.motDePasse;
    const h=req.query.habilitation;

    connection.query(`UPDATE comptes SET nomCompte = '${n}', prenomCompte = '${p}', magasin = '${m}', identifiantCompte = '${id}', motDePasseCompte = '${mdp}', niveauHabilitationCompte = '${h}' WHERE idCompte = ${i}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/demandes/modify",(req,res) => {
    const i=req.query.id;
    const cd=req.query.contreDescription;
    const cc=req.query.contreCout;
    const s=req.query.statut;
    connection.query(`UPDATE demandes SET contreDescriptionDemande = '${cd}', contreCoutDemande = '${cc}', statut = '${s}' WHERE idDemande = ${i}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/ventespec/modify",(req,res) => {
    const id=req.query.id;
    const e=req.query.etat;
    const p=req.query.prix;
    const d=req.query.description;
    const i=req.query.imei;
    const r=req.query.restant;
    
    connection.query(`UPDATE pecventes SET etat = '${e}', prixTTCPECVente = '${p}', IMEIPECVente = '${i}', descriptionPECVente = '${d}', prixTTCRestantPECVente = '${r}' WHERE idPECVente = ${id}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/ventesv/modify",(req,res) => {
    const i=req.query.id;
    const p=req.query.prix;
    const r=req.query.restant;

    connection.query(`UPDATE vventes SET prixTTCVVente = '${p}', prixTTCRestantVVente = '${r}' WHERE idVente = ${i}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/quantites/modify",(req,res) => {
    const s=req.query.stock;
    const m=req.query.magasin;
    const q=req.query.quantite;
    
    connection.query(`UPDATE quantites SET nombreQuantite = '${q}' WHERE stock = ${s} AND magasin = ${m}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/sav/modify",(req,res) => {
    const i=req.query.id;
    const d=req.query.description;
    const e=req.query.etat;
    
    connection.query(`UPDATE sav SET descriptionSAV = '${d}', etat = '${e}' WHERE idSAV = ${i}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/articlespecventes/modify",(req,res) => {
    const i=req.query.id;
    const s=req.query.savCreer;
    
    connection.query(`UPDATE articlespecventes SET savCreer = '${s}' WHERE idArticle = ${i}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});
app.get("/articlesvventes/modify",(req,res) => {
    const i=req.query.id;
    const s=req.query.savCreer;
    
    connection.query(`UPDATE articlesvventes SET savCreer = '${s}' WHERE idArticle = ${i}`, (err,rows) => 
    {
        if(!err)
        res.send(rows);
    })
});



//=============================================DEL LES INFOS=============================================
app.get("/stocks/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM stocks WHERE idStock = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/clients/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM clients WHERE idClient = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/comptes/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM comptes WHERE idCompte = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/demandes/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM demandes WHERE idDemande = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/ventepec/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM pecventes WHERE idPECVente = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/ventev/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM vventes WHERE idVente = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/reglementsventespec/delete",(req,res) => {
    const id=req.query.id;

    connection.query(`DELETE FROM reglementspecventes WHERE idReglement = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/reglementsventesv/delete",(req,res) => {
    const i=req.query.id;
    const v=req.query.vente;

    if(i)
    {
        connection.query(`DELETE FROM reglementsvventes WHERE idReglement = '${i}'`, (err,rows) => 
        {
            if(!err)
                res.send(rows);
        })
    }
    else{
        connection.query(`DELETE FROM reglementsvventes WHERE VVente = '${v}'`, (err,rows) => 
        {
            if(!err)
                res.send(rows);
        })
    }
});
app.get("/articlespecventes/delete",(req,res) => {
    const id=req.query.id;
    connection.query(`DELETE FROM articlespecventes WHERE PECVente = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/articlesvventes/delete",(req,res) => {
    const id=req.query.id;
    connection.query(`DELETE FROM articlesvventes WHERE VVente = '${id}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/quantites/delete",(req,res) => {
    const i=req.query.id;
    connection.query(`DELETE FROM quantites WHERE stock = '${i}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/avoirs/delete",(req,res) => {
    const i=req.query.id;
    connection.query(`DELETE FROM avoirs WHERE idAvoir = '${i}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/sav/delete",(req,res) => {
    const i=req.query.id;
    connection.query(`DELETE FROM sav WHERE idSAV = '${i}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/articlessav/delete",(req,res) => {
    const i=req.query.idSAV;
    connection.query(`DELETE FROM articlessav WHERE sav = '${i}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});
app.get("/avoirs/delete",(req,res) => {
    const i=req.query.id;
    connection.query(`DELETE FROM avoirs WHERE idAvoir = '${i}'`, (err,rows) => 
    {
        if(!err)
            res.send(rows);
    })
});



//=============================================AUTRE LES INFOS=============================================
app.get("/stocks/infos",(req,res) => {
    connection.query(`SELECT idStock FROM stocks ORDER BY idStock DESC LIMIT 1`, (err,rows) => 
    {
        if(!err) res.send(rows);
    })
});
