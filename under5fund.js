/**
 * Created by xiaobxia on 2018/3/4.
 */
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs-extra');

/**
 * 找出低于0.5费率的基金
 */

const all = [
  {"code":"160222","rate":0.7},
  {"code":"001631","rate":0.3},
  {"code":"001632","rate":0},
  {"code":"160632","rate":0.5},
  {"code":"110022","rate":0.5},
  {"code":"161725","rate":0.5},
  {"code":"000248","rate":0.5},
  {"code":"001458","rate":0.5},
  {"code":"005235","rate":0.75},
  {"code":"005236","rate":0.5},
  {"code":"005063","rate":0.1},
  {"code":"001178","rate":0.75},
  {"code":"002697","rate":0.75},
  {"code":"002621","rate":0.75},
  {"code":"217017","rate":0.5},
  {"code":"000854","rate":0.75},
  {"code":"000884","rate":0.75},
  {"code":"001677","rate":0.75},
  {"code":"001528","rate":0.75},
  {"code":"004995","rate":0.75},
  {"code":"001040","rate":0.75},
  {"code":"001208","rate":0.75},
  {"code":"001719","rate":0.75},
  {"code":"160127","rate":0.5},
  {"code":"001473","rate":0.75},
  {"code":"001542","rate":0.75},
  {"code":"001193","rate":0.75},
  {"code":"003634","rate":0.75},
  {"code":"165312","rate":0.5},
  {"code":"217027","rate":0.5},
  {"code":"160133","rate":0.75},
  {"code":"001195","rate":0.75},
  {"code":"001725","rate":0.75},
  {"code":"004683","rate":0.75},
  {"code":"001703","rate":0.75},
  {"code":"501012","rate":0.1},
  {"code":"501011","rate":0.1},
  {"code":"000867","rate":0.75},
  {"code":"001162","rate":0.75},
  {"code":"001496","rate":0.75},
  {"code":"001133","rate":0.5},
  {"code":"000628","rate":0.75},
  {"code":"000960","rate":0.75},
  {"code":"001163","rate":0.75},
  {"code":"001008","rate":0.5},
  {"code":"000913","rate":0.75},
  {"code":"000524","rate":0.75},
  {"code":"161213","rate":0.8},
  {"code":"001171","rate":0.75},
  {"code":"001651","rate":0.75},
  {"code":"519935","rate":0.75},
  {"code":"370023","rate":0.5},
  {"code":"001245","rate":0.75},
  {"code":"481012","rate":0.5},
  {"code":"001404","rate":0.75},
  {"code":"162412","rate":0.5},
  {"code":"502056","rate":0.5},
  {"code":"000974","rate":0.75},
  {"code":"001409","rate":0.75},
  {"code":"005106","rate":0.75},
  {"code":"168001","rate":0.5},
  {"code":"000968","rate":0.5},
  {"code":"399011","rate":0.75},
  {"code":"001714","rate":0.75},
  {"code":"004075","rate":0.75},
  {"code":"001825","rate":0.75},
  {"code":"000592","rate":0.75},
  {"code":"001628","rate":0.75},
  {"code":"740101","rate":0.5},
  {"code":"530015","rate":0.5},
  {"code":"673090","rate":0.75},
  {"code":"005267","rate":0.75},
  {"code":"519032","rate":0.5},
  {"code":"001043","rate":0.75},
  {"code":"004716","rate":0.75},
  {"code":"000866","rate":0.75},
  {"code":"003298","rate":0.75},
  {"code":"003299","rate":0.5},
  {"code":"003745","rate":0.75},
  {"code":"519673","rate":0.75},
  {"code":"540009","rate":0.5},
  {"code":"000780","rate":0.75},
  {"code":"001044","rate":0.75},
  {"code":"450009","rate":0.5},
  {"code":"002595","rate":0.75},
  {"code":"001781","rate":0.75},
  {"code":"050013","rate":0.5},
  {"code":"000711","rate":0.1},
  {"code":"160635","rate":0.5},
  {"code":"001027","rate":0.5},
  {"code":"004606","rate":0.75},
  {"code":"160219","rate":0.5},
  {"code":"001577","rate":0.75},
  {"code":"240019","rate":0.5},
  {"code":"501005","rate":0.1},
  {"code":"004485","rate":0.5},
  {"code":"004484","rate":0.75},
  {"code":"162307","rate":0.5},
  {"code":"320010","rate":0.5},
  {"code":"519100","rate":0.5},
  {"code":"213010","rate":0.5},
  {"code":"202211","rate":0.75},
  {"code":"162509","rate":0.5},
  {"code":"164508","rate":0.5},
  {"code":"001587","rate":0},
  {"code":"001586","rate":0.3},
  {"code":"410008","rate":0.5},
  {"code":"163808","rate":0.5},
  {"code":"005009","rate":0.75},
  {"code":"050021","rate":0.5},
  {"code":"000916","rate":0.75},
  {"code":"004098","rate":0.75},
  {"code":"004851","rate":0.75},
  {"code":"001230","rate":0.75},
  {"code":"163118","rate":0.5},
  {"code":"000577","rate":0.75},
  {"code":"160322","rate":0.75},
  {"code":"000059","rate":0.5},
  {"code":"001849","rate":0.75},
  {"code":"001550","rate":0.3},
  {"code":"001551","rate":0},
  {"code":"001696","rate":0.75},
  {"code":"164401","rate":0.5},
  {"code":"001460","rate":0.5},
  {"code":"001878","rate":0.75},
  {"code":"004403","rate":0.75},
  {"code":"004404","rate":0.5},
  {"code":"004476","rate":0.75},
  {"code":"000373","rate":0.5},
  {"code":"000376","rate":0.1},
  {"code":"310398","rate":0.5},
  {"code":"002300","rate":0.75},
  {"code":"519671","rate":0.5},
  {"code":"005237","rate":0.75},
  {"code":"165519","rate":0.5},
  {"code":"005238","rate":0.5},
  {"code":"217016","rate":0.5},
  {"code":"001626","rate":0.75},
  {"code":"001180","rate":0.5},
  {"code":"005112","rate":0.5},
  {"code":"001105","rate":0.75},
  {"code":"001975","rate":0.75},
  {"code":"002335","rate":0.5},
  {"code":"002334","rate":0.75},
  {"code":"161907","rate":0.5},
  {"code":"000955","rate":0.75},
  {"code":"090010","rate":0.5},
  {"code":"110019","rate":0.5},
  {"code":"001917","rate":0.75},
  {"code":"165806","rate":0.5},
  {"code":"000042","rate":0.5},
  {"code":"001070","rate":0.75},
  {"code":"005304","rate":0.5},
  {"code":"005303","rate":0.75},
  {"code":"002588","rate":0.3},
  {"code":"161812","rate":0.5},
  {"code":"530018","rate":0.5},
  {"code":"162714","rate":0.5},
  {"code":"001009","rate":0.75},
  {"code":"001605","rate":0.75},
  {"code":"001663","rate":0.75},
  {"code":"110003","rate":0.5},
  {"code":"001051","rate":0.5},
  {"code":"000835","rate":0.5},
  {"code":"001549","rate":0},
  {"code":"502020","rate":0.5},
  {"code":"502040","rate":0.5},
  {"code":"001548","rate":0.3},
  {"code":"001416","rate":0.75},
  {"code":"502048","rate":0.5},
  {"code":"001237","rate":0.5},
  {"code":"000778","rate":0.75},
  {"code":"001764","rate":0.75},
  {"code":"399001","rate":0.5},
  {"code":"501007","rate":0.1},
  {"code":"501008","rate":0.1},
  {"code":"202021","rate":0.8},
  {"code":"001482","rate":0.75},
  {"code":"001611","rate":0.3},
  {"code":"001766","rate":0.75},
  {"code":"000594","rate":0.75},
  {"code":"001612","rate":0},
  {"code":"040190","rate":0.5},
  {"code":"000368","rate":0.5},
  {"code":"001520","rate":0.75},
  {"code":"161507","rate":0.5},
  {"code":"360001","rate":0.5},
  {"code":"320022","rate":0.75},
  {"code":"001736","rate":0.75},
  {"code":"003956","rate":0.75},
  {"code":"005620","rate":0.75},
  {"code":"160615","rate":0.5},
  {"code":"460300","rate":0.5},
  {"code":"161811","rate":0.5},
  {"code":"519116","rate":0.5},
  {"code":"050002","rate":0.5},
  {"code":"160807","rate":0.5},
  {"code":"161207","rate":0.5},
  {"code":"180003","rate":0.5},
  {"code":"020011","rate":0.5},
  {"code":"162213","rate":0.5},
  {"code":"166802","rate":0.5},
  {"code":"165309","rate":0.5},
  {"code":"310318","rate":0.5},
  {"code":"660008","rate":0.5},
  {"code":"450008","rate":0.5},
  {"code":"001490","rate":0.75},
  {"code":"002980","rate":0.75},
  {"code":"003054","rate":0.5},
  {"code":"003194","rate":0.5},
  {"code":"519193","rate":0.75},
  {"code":"160417","rate":0.5},
  {"code":"165515","rate":0.5},
  {"code":"004292","rate":0.75},
  {"code":"167601","rate":0.5},
  {"code":"000311","rate":0.5},
  {"code":"000312","rate":0.5},
  {"code":"000313","rate":0},
  {"code":"000613","rate":0.5},
  {"code":"000656","rate":0.5},
  {"code":"000176","rate":0.75},
  {"code":"000961","rate":0.05},
  {"code":"163407","rate":0.8},
  {"code":"001016","rate":0.75},
  {"code":"110020","rate":0.5},
  {"code":"000051","rate":0.5},
  {"code":"166007","rate":0.5},
  {"code":"003262","rate":0.5},
  {"code":"481009","rate":0.5},
  {"code":"002315","rate":0.5},
  {"code":"002310","rate":0.75},
  {"code":"003015","rate":0.75},
  {"code":"003261","rate":0.75},
  {"code":"110030","rate":0.5},
  {"code":"004191","rate":0.5},
  {"code":"004190","rate":0.75},
  {"code":"003475","rate":0.5},
  {"code":"001223","rate":0.75},
  {"code":"001015","rate":0.75},
  {"code":"003876","rate":0.75},
  {"code":"202015","rate":0.7},
  {"code":"003053","rate":0.1},
  {"code":"003416","rate":0.75},
  {"code":"519677","rate":0},
  {"code":"000751","rate":0.75},
  {"code":"001420","rate":0.5},
  {"code":"001426","rate":0.75},
  {"code":"001974","rate":0.75},
  {"code":"040180","rate":0.5},
  {"code":"206012","rate":0.5},
  {"code":"519180","rate":0.5},
  {"code":"002387","rate":0.75},
  {"code":"001188","rate":0.75},
  {"code":"000803","rate":0.75},
  {"code":"000411","rate":0.75},
  {"code":"000893","rate":0.5},
  {"code":"000688","rate":0.75},
  {"code":"000418","rate":0.75},
  {"code":"000309","rate":0.75},
  {"code":"501050","rate":0.75},
  {"code":"540006","rate":0.5},
  {"code":"005268","rate":0.75},
  {"code":"002121","rate":0.75},
  {"code":"340006","rate":0.5},
  {"code":"164205","rate":0.75},
  {"code":"160136","rate":0.5},
  {"code":"502006","rate":0.5},
  {"code":"161026","rate":0.5},
  {"code":"165310","rate":0.5},
  {"code":"000756","rate":0.75},
  {"code":"001685","rate":0.75},
  {"code":"001291","rate":0.75},
  {"code":"004352","rate":0.75},
  {"code":"540007","rate":0.5},
  {"code":"000729","rate":0.75},
  {"code":"161123","rate":0.5},
  {"code":"530010","rate":0.5},
  {"code":"160806","rate":0.5},
  {"code":"001589","rate":0},
  {"code":"001588","rate":0.3},
  {"code":"000746","rate":0.75},
  {"code":"470007","rate":0.5},
  {"code":"000975","rate":0.5},
  {"code":"540012","rate":0.5},
  {"code":"501029","rate":0.5},
  {"code":"376510","rate":0.5},
  {"code":"110021","rate":0.5},
  {"code":"000831","rate":0.75},
  {"code":"206010","rate":0.5},
  {"code":"163111","rate":0.5},
  {"code":"410010","rate":0.5},
  {"code":"001277","rate":0.75},
  {"code":"161118","rate":0.5},
  {"code":"003492","rate":0.75},
  {"code":"003366","rate":0.75},
  {"code":"161030","rate":0.5},
  {"code":"001579","rate":0.75},
  {"code":"005563","rate":0.75},
  {"code":"005564","rate":0.5},
  {"code":"001242","rate":0.3},
  {"code":"160415","rate":0.5},
  {"code":"233010","rate":0.5},
  {"code":"470068","rate":0.5},
  {"code":"162907","rate":0.5},
  {"code":"165707","rate":0.5},
  {"code":"519117","rate":0.5},
  {"code":"000828","rate":0.75},
  {"code":"700002","rate":0.5},
  {"code":"240016","rate":0.5},
  {"code":"000793","rate":0.75},
  {"code":"162510","rate":0.5},
  {"code":"001421","rate":0.75},
  {"code":"001956","rate":0.75},
  {"code":"001236","rate":0.75},
  {"code":"167702","rate":0.5},
  {"code":"202025","rate":0.8},
  {"code":"001644","rate":0.5},
  {"code":"001643","rate":0.75},
  {"code":"001047","rate":0.75},
  {"code":"167703","rate":0.5},
  {"code":"004997","rate":0.75},
  {"code":"001717","rate":0.75},
  {"code":"590007","rate":0.5},
  {"code":"460220","rate":0.5},
  {"code":"161612","rate":0.8},
  {"code":"001556","rate":0.75},
  {"code":"202017","rate":0.8},
  {"code":"003312","rate":0.75},
  {"code":"501010","rate":0.1},
  {"code":"501009","rate":0.1},
  {"code":"001557","rate":0.5},
  {"code":"163109","rate":0.5},
  {"code":"163110","rate":0.5},
  {"code":"000761","rate":0.75},
  {"code":"180033","rate":0.5},
  {"code":"000996","rate":0.75},
  {"code":"001583","rate":0.75},
  {"code":"002861","rate":0.75},
  {"code":"005034","rate":0.5},
  {"code":"005033","rate":0.75},
  {"code":"001113","rate":0.5},
  {"code":"161816","rate":0.5},
  {"code":"003623","rate":0.5},
  {"code":"003622","rate":0.75},
  {"code":"167301","rate":0.5},
  {"code":"001158","rate":0.75},
  {"code":"001050","rate":0.75},
  {"code":"163119","rate":0.5},
  {"code":"161122","rate":0.5},
  {"code":"000978","rate":0.75},
  {"code":"160638","rate":0.5},
  {"code":"167503","rate":0.5},
  {"code":"168201","rate":0.7},
  {"code":"003318","rate":0.5},
  {"code":"161726","rate":0.5},
  {"code":"005566","rate":0.5},
  {"code":"005565","rate":0.75},
  {"code":"160636","rate":0.5},
  {"code":"001560","rate":0.3},
  {"code":"519975","rate":0.75},
  {"code":"161025","rate":0.5},
  {"code":"001561","rate":0},
  {"code":"162208","rate":0.5},
  {"code":"001718","rate":0.75},
  {"code":"001554","rate":0.3},
  {"code":"001692","rate":0.75},
  {"code":"162010","rate":0.5},
  {"code":"001555","rate":0},
  {"code":"002952","rate":0.75},
  {"code":"320014","rate":0.5},
  {"code":"001036","rate":0.75},
  {"code":"519965","rate":0.75},
  {"code":"163821","rate":0.5},
  {"code":"161724","rate":0.5},
  {"code":"519027","rate":0.5},
  {"code":"585001","rate":0.5},
  {"code":"000950","rate":0.5},
  {"code":"502013","rate":0.5},
  {"code":"160625","rate":0.5},
  {"code":"160516","rate":0.5},
  {"code":"161032","rate":0.6},
  {"code":"162107","rate":0.5},
  {"code":"001645","rate":0.75},
  {"code":"001553","rate":0},
  {"code":"005328","rate":0.75},
  {"code":"001552","rate":0.3},
  {"code":"002332","rate":0.75},
  {"code":"002333","rate":0.5},
  {"code":"161720","rate":0.5},
  {"code":"161027","rate":0.5},
  {"code":"519606","rate":0.75},
  {"code":"502053","rate":0.5},
  {"code":"502010","rate":0.5},
  {"code":"160633","rate":0.5},
  {"code":"161825","rate":0.5},
  {"code":"004070","rate":0},
  {"code":"161629","rate":0.5},
  {"code":"160419","rate":0.5},
  {"code":"004069","rate":0.5},
  {"code":"004273","rate":0.5},
  {"code":"004450","rate":0.75},
  {"code":"004272","rate":0.75},
  {"code":"005036","rate":0.5},
  {"code":"161223","rate":0.5},
  {"code":"001396","rate":0.75},
  {"code":"002236","rate":0.5},
  {"code":"160808","rate":0.5},
  {"code":"161910","rate":0.5},
  {"code":"005209","rate":0.75},
  {"code":"005035","rate":0.75},
  {"code":"020021","rate":0.5},
  {"code":"163209","rate":0.5},
  {"code":"165521","rate":0.5},
  {"code":"161211","rate":0.8},
  {"code":"163113","rate":0.5},
  {"code":"501016","rate":0.5},
  {"code":"001042","rate":0.75},
  {"code":"005210","rate":0.5},
  {"code":"290010","rate":0.5},
  {"code":"001672","rate":0.75},
  {"code":"000409","rate":0.75},
  {"code":"001039","rate":0.75},
  {"code":"161718","rate":0.5},
  {"code":"001637","rate":0.75},
  {"code":"001521","rate":0.75},
  {"code":"502000","rate":0.5},
  {"code":"001915","rate":0.75},
  {"code":"001539","rate":0.5},
  {"code":"002386","rate":0.75},
  {"code":"160814","rate":0.5},
  {"code":"050024","rate":0.5},
  {"code":"002210","rate":0.75},
  {"code":"003625","rate":0.5},
  {"code":"003624","rate":0.75},
  {"code":"161217","rate":0.8},
  {"code":"001319","rate":0.75},
  {"code":"162413","rate":0.5},
  {"code":"004195","rate":0.5},
  {"code":"003646","rate":0.75},
  {"code":"004194","rate":0.75},
  {"code":"003647","rate":0.5},
  {"code":"001469","rate":0.5},
  {"code":"001733","rate":0.75},
  {"code":"005402","rate":0.75},
  {"code":"001097","rate":0.75},
  {"code":"160418","rate":0.5},
  {"code":"161029","rate":0.5},
  {"code":"160517","rate":0.5},
  {"code":"160631","rate":0.5},
  {"code":"161723","rate":0.5},
  {"code":"161121","rate":0.5},
  {"code":"168205","rate":0.7},
  {"code":"001594","rate":0.3},
  {"code":"001595","rate":0},
  {"code":"001938","rate":0.75},
  {"code":"004597","rate":0.5},
  {"code":"004598","rate":0.5},
  {"code":"001705","rate":0.75},
  {"code":"001072","rate":0.75},
  {"code":"004730","rate":0.75},
  {"code":"160620","rate":0.5},
  {"code":"090012","rate":0.5},
  {"code":"001649","rate":0.75},
  {"code":"000979","rate":0.75},
  {"code":"000478","rate":0.5},
  {"code":"000962","rate":0.05},
  {"code":"001455","rate":0.5},
  {"code":"168203","rate":0.7},
  {"code":"001351","rate":0.5},
  {"code":"001214","rate":0.25},
  {"code":"502023","rate":0.5},
  {"code":"164809","rate":0.5},
  {"code":"002510","rate":0.5},
  {"code":"002316","rate":0.5},
  {"code":"001054","rate":0.75},
  {"code":"003016","rate":0.75},
  {"code":"002907","rate":0.75},
  {"code":"002311","rate":0.75},
  {"code":"001052","rate":0.5},
  {"code":"002906","rate":0.75},
  {"code":"003986","rate":0.5},
  {"code":"160119","rate":0.7},
  {"code":"001241","rate":0.5},
  {"code":"004193","rate":0.5},
  {"code":"004192","rate":0.75},
  {"code":"005062","rate":0.5},
  {"code":"501037","rate":0},
  {"code":"501036","rate":0},
  {"code":"005310","rate":0.75},
  {"code":"001576","rate":0.75},
  {"code":"004945","rate":0.5},
  {"code":"005608","rate":0.5},
  {"code":"005607","rate":0.75},
  {"code":"165511","rate":0.5},
  {"code":"660011","rate":0.5},
  {"code":"160616","rate":0.5},
  {"code":"162216","rate":0.5},
  {"code":"160137","rate":0.5},
  {"code":"001899","rate":0.75},
  {"code":"001541","rate":0.75},
  {"code":"005037","rate":0.75},
  {"code":"005038","rate":0.5},
  {"code":"240005","rate":0.5},
  {"code":"000696","rate":0.75},
  {"code":"001459","rate":0.5},
  {"code":"160218","rate":0.5},
  {"code":"161819","rate":0.5},
  {"code":"690008","rate":0.5},
  {"code":"001166","rate":0.75},
  {"code":"005240","rate":0.5},
  {"code":"005239","rate":0.75},
  {"code":"160629","rate":0.5},
  {"code":"164818","rate":0.7},
  {"code":"004752","rate":0.5},
  {"code":"004753","rate":0.5},
  {"code":"161721","rate":0.5},
  {"code":"164908","rate":0.5},
  {"code":"501030","rate":0.1},
  {"code":"540008","rate":0.5},
  {"code":"501031","rate":0.1},
  {"code":"001410","rate":0.75},
  {"code":"005288","rate":0.75},
  {"code":"005287","rate":0.5},
  {"code":"165524","rate":0.5},
  {"code":"004482","rate":0.75},
  {"code":"001028","rate":0.75},
  {"code":"004483","rate":0.5},
  {"code":"001104","rate":0.75},
  {"code":"000549","rate":0.75},
  {"code":"257060","rate":0.5},
  {"code":"001713","rate":0.5},
  {"code":"001790","rate":0.75},
  {"code":"005612","rate":0.75},
  {"code":"519034","rate":0.5},
  {"code":"206005","rate":0.5},
  {"code":"161715","rate":0.5},
  {"code":"004593","rate":0.5},
  {"code":"160628","rate":0.5},
  {"code":"164907","rate":0.5},
  {"code":"165315","rate":0.5},
  {"code":"502036","rate":0.5},
  {"code":"004643","rate":0.5},
  {"code":"004642","rate":0.5},
  {"code":"005224","rate":0.1},
  {"code":"005223","rate":0.1},
  {"code":"165525","rate":0.5},
  {"code":"005189","rate":0.75},
  {"code":"005188","rate":0.5},
  {"code":"001361","rate":0.5},
  {"code":"000457","rate":0.75},
  {"code":"161033","rate":0.5},
  {"code":"001064","rate":0.5},
  {"code":"001126","rate":0.75},
  {"code":"164304","rate":0.5},
  {"code":"001591","rate":0},
  {"code":"001590","rate":0.3},
  {"code":"160634","rate":0.5},
  {"code":"004698","rate":0.75},
  {"code":"164819","rate":0.7},
  {"code":"001313","rate":0.75},
  {"code":"002229","rate":0.75},
  {"code":"501025","rate":0.5},
  {"code":"003834","rate":0.75},
  {"code":"001397","rate":0.75},
  {"code":"005636","rate":0.5},
  {"code":"005635","rate":0.75},
  {"code":"163116","rate":0.5},
  {"code":"160224","rate":0.7},
  {"code":"217019","rate":0.5},
  {"code":"000586","rate":0.75},
  {"code":"005457","rate":0.75},
  {"code":"003069","rate":0.75},
  {"code":"002289","rate":0.75},
  {"code":"001617","rate":0.3},
  {"code":"001618","rate":0},
  {"code":"000991","rate":0.75},
  {"code":"005530","rate":0.75},
  {"code":"167706","rate":0.5},
  {"code":"167705","rate":0.5},
  {"code":"502030","rate":0.5},
  {"code":"160135","rate":0.5},
  {"code":"160639","rate":0.5},
  {"code":"160640","rate":0.5},
  {"code":"164820","rate":0.7},
  {"code":"164821","rate":0.7},
  {"code":"005259","rate":0.75},
  {"code":"004805","rate":0.75},
  {"code":"004812","rate":0.75},
  {"code":"001629","rate":0.3},
  {"code":"001630","rate":0},
  {"code":"161031","rate":0.5},
  {"code":"501002","rate":0.5},
  {"code":"161613","rate":0.8},
  {"code":"110026","rate":0.5},
  {"code":"000942","rate":0.5},
  {"code":"160637","rate":0.5},
  {"code":"001593","rate":0},
  {"code":"161022","rate":0.5},
  {"code":"002656","rate":0.5},
  {"code":"160223","rate":0.5},
  {"code":"001592","rate":0.3},
  {"code":"003766","rate":0.125},
  {"code":"003765","rate":0.5},
  {"code":"005390","rate":0.5},
  {"code":"005391","rate":0.125},
  {"code":"001726","rate":0.75},
  {"code":"161028","rate":0.5},
  {"code":"001707","rate":0.75},
  {"code":"005502","rate":0.75},
  {"code":"000697","rate":0.75},
  {"code":"160626","rate":0.5},
  {"code":"004925","rate":0.75},
  {"code":"165520","rate":0.5},
  {"code":"000985","rate":0.75},
  {"code":"001600","rate":0},
  {"code":"001599","rate":0.3},
  {"code":"165522","rate":0.5},
  {"code":"005629","rate":0.5},
  {"code":"160221","rate":0.7},
  {"code":"519167","rate":0.75},
  {"code":"004040","rate":0.75},
  {"code":"003853","rate":0.75},
  {"code":"004041","rate":0.5},
  {"code":"005161","rate":0.75},
  {"code":"005927","rate":0.75},
  {"code":"005928","rate":0.5},
  {"code":"005669","rate":0.75},
  {"code":"000925","rate":0.75},
  {"code":"001616","rate":0.75},
  {"code":"002168","rate":0.75},
  {"code":"165523","rate":0.5},
  {"code":"540010","rate":0.5},
  {"code":"005628","rate":0.75},
  {"code":"160420","rate":0.5},
  {"code":"164402","rate":0.5},
  {"code":"003984","rate":0.75},
  {"code":"003985","rate":0.5},
  {"code":"501019","rate":0.5},
  {"code":"000971","rate":0.75},
  {"code":"001476","rate":0.75},
  {"code":"001877","rate":0.75},
  {"code":"005496","rate":0.5},
  {"code":"005495","rate":0.75},
  {"code":"003145","rate":0.75},
  {"code":"002900","rate":0.5},
  {"code":"160630","rate":0.5},
  {"code":"163115","rate":0.5},
  {"code":"000596","rate":0.5},
  {"code":"161628","rate":0.5},
  {"code":"161024","rate":0.5},
  {"code":"003017","rate":0.5},
  {"code":"502003","rate":0.5},
  {"code":"501308","rate":0},
  {"code":"003702","rate":0.75},
  {"code":"004616","rate":0.75},
  {"code":"164811","rate":0.5}
];

let listU5 = [];
all.forEach(function (item) {
  if (item.rate > 0.5) {
    listU5.push({
      code: item.code
    });
  }
});

function logData(fileData) {
  const fileName = './mock/under1fund.json';
  fs.ensureFile(fileName).then(() => {
    fs.writeJson(fileName, fileData, {spaces: 2})
  });
}
console.log(listU5.length)
logData({
  funds: listU5.slice(240, 278)
});


