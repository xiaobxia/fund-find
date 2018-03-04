/**
 * Created by xiaobxia on 2018/3/4.
 */
const request = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const Iconv = require('iconv-lite');

function logData(fileData) {
  const fileName = './mock/lookfor.json';
  fs.ensureFile(fileName).then(() => {
    fs.writeJson(fileName, fileData, {spaces: 2})
  });
}

const all = [
  {code: '001133', rate: 0.5},
  {code: '161122', rate: 0.5},
  {code: '001064', rate: 0.5},
  {code: '160630', rate: 0.5},
  {code: '530015', rate: 0.5},
  {code: '460220', rate: 0.5},
  {code: '161026', rate: 0.5},
  {code: '000368', rate: 0.5},
  {code: '001586', rate: 0.5},
  {code: '001713', rate: 0.5},
  {code: '090012', rate: 0.5},
  {code: '502013', rate: 0.5},
  {code: '001539', rate: 0.5},
  {code: '502023', rate: 0.5},
  {code: '004483', rate: 0.5},
  {code: '160420', rate: 0.5},
  {code: '001617', rate: 0.5},
  {code: '161118', rate: 0.5},
  {code: '000248', rate: 0.5},
  {code: '206012', rate: 0.5},
  {code: '160808', rate: 0.5},
  {code: '502020', rate: 0.5},
  {code: '160626', rate: 0.5},
  {code: '217019', rate: 0.5},
  {code: '163111', rate: 0.5},
  {code: '410010', rate: 0.5},
  {code: '001618', rate: 0.125},
  {code: '164907', rate: 0.5},
  {code: '161507', rate: 0.5},
  {code: '160620', rate: 0.5},
  {code: '001549', rate: 0.125},
  {code: '161030', rate: 0.5},
  {code: '163116', rate: 0.5},
  {code: '450009', rate: 0.5},
  {code: '160224', rate: 0.7},
  {code: '167703', rate: 0.5},
  {code: '470068', rate: 0.5},
  {code: '700002', rate: 0.5},
  {code: '163113', rate: 0.5},
  {code: '202015', rate: 0.12},
  {code: '001420', rate: 0.5},
  {code: '585001', rate: 0.5},
  {code: '164811', rate: 0.5},
  {code: '050002', rate: 0.5},
  {code: '180033', rate: 0.5},
  {code: '161725', rate: 0.5},
  {code: '161025', rate: 0.5},
  {code: '161816', rate: 0.5},
  {code: '163209', rate: 0.5},
  {code: '501005', rate: 0.1},
  {code: '263001', rate: 0.5},
  {code: '502026', rate: 0.5},
  {code: '001460', rate: 0.5},
  {code: '003625', rate: 0.5},
  {code: '161726', rate: 0.5},
  {code: '502056', rate: 0.5},
  {code: '160218', rate: 0.5},
  {code: '001555', rate: 0.125,},
  {code: '164304', rate: 0.5},
  {code: '540010', rate: 0.5},
  {code: '502006', rate: 0.5},
  {code: '206010', rate: 0.5},
  {code: '003318', rate: 0.5},
  {code: '481012', rate: 0.5},
  {code: '519032', rate: 0.5},
  {code: '002316', rate: 0.5},
  {code: '001629', rate: 0.5},
  {code: '004642', rate: 0.5},
  {code: '001551', rate: 0.125,},
  {code: '040190', rate: 0.5},
  {code: '161907', rate: 0.5},
  {code: '001553', rate: 0.125,},
  {code: '161028', rate: 0.5},
  {code: '161029', rate: 0.5},
  {code: '206005', rate: 0.5},
  {code: '000042', rate: 0.5},
  {code: '002588', rate: 0.3},
  {code: '165521', rate: 0.5},
  {code: '161031', rate: 0.5},
  {code: '001459', rate: 0.5},
  {code: '168203', rate: 0.7},
  {code: '161223', rate: 0.5},
  {code: '217016', rate: 0.5},
  {code: '005036', rate: 0.5},
  {code: '003985', rate: 0.5},
  {code: '161022', rate: 0.5},
  {code: '165315', rate: 0.5},
  {code: '004069', rate: 0.5},
  {code: '160516', rate: 0.5},
  {code: '161825', rate: 0.5},
  {code: '000051', rate: 0.5},
  {code: '000311', rate: 0.5},
  {code: '020011', rate: 0.5},
  {code: '110030', rate: 0.5},
  {code: '481009', rate: 0.5},
  {code: '165806', rate: 0.5},
  {code: '161910', rate: 0.5},
  {code: '040180', rate: 0.5},
  {code: '310318', rate: 0.5},
  {code: '160419', rate: 0.5},
  {code: '290010', rate: 0.5},
  {code: '160137', rate: 0.5},
  {code: '502036', rate: 0.5},
  {code: '164823', rate: 0.5},
  {code: '004191', rate: 0.5},
  {code: '160417', rate: 0.5},
  {code: '167601', rate: 0.5},
  {code: '110020', rate: 0.5},
  {code: '003475', rate: 0.5},
  {code: '165309', rate: 0.5},
  {code: '000656', rate: 0.5},
  {code: '166007', rate: 0.5},
  {code: '501016', rate: 0.5},
  {code: '161207', rate: 0.5},
  {code: '165524', rate: 0.5},
  {code: '001051', rate: 0.5},
  {code: '160223', rate: 0.5},
  {code: '501008', rate: 0.1},
  {code: '003765', rate: 0.5},
  {code: '160637', rate: 0.5},
  {code: '000961', rate: 0.05},
  {code: '165515', rate: 0.5},
  {code: '530010', rate: 0.5},
  {code: '160616', rate: 0.5},
  {code: '164508', rate: 0.5},
  {code: '160632', rate: 0.5},
  {code: '163117', rate: 0.5},
  {code: '660008', rate: 0.5},
  {code: '161121', rate: 0.5},
  {code: '001552', rate: 0.5},
  {code: '000312', rate: 0.5},
  {code: '213010', rate: 0.5},
  {code: '660011', rate: 0.5},
  {code: '001587', rate: 0.125,},
  {code: '460300', rate: 0.5},
  {code: '001554', rate: 0.5},
  {code: '168201', rate: 0.7},
  {code: '160638', rate: 0.5},
  {code: '162107', rate: 0.5},
  {code: '001458', rate: 0.5},
  {code: '167702', rate: 0.5},
  {code: '001351', rate: 0.5},
  {code: '160629', rate: 0.5},
  {code: '160628', rate: 0.5},
  {code: '001361', rate: 0.5},
  {code: '240019', rate: 0.5},
  {code: '001592', rate: 0.5},
  {code: '320010', rate: 0.5},
  {code: '450008', rate: 0.5},
  {code: '002900', rate: 0.5},
  {code: '161819', rate: 0.5},
  {code: '004598', rate: 0.5},
  {code: '161723', rate: 0.5},
  {code: '167301', rate: 0.5},
  {code: '501025', rate: 0.5},
  {code: '004597', rate: 0.5},
  {code: '001611', rate: 0.5},
  {code: '020021', rate: 0.5},
  {code: '168205', rate: 0.7},
  {code: '165511', rate: 0.5},
  {code: '001589', rate: 0.125},
  {code: '000962', rate: 0.05},
  {code: '163110', rate: 0.5},
  {code: '519117', rate: 0.5},
  {code: '540006', rate: 0.5},
  {code: '000478', rate: 0.5},
  {code: '001052', rate: 0.5},
  {code: '501020', rate: 0.5},
  {code: '540007', rate: 0.5},
  {code: '160615', rate: 0.5},
  {code: '110021', rate: 0.5},
  {code: '165525', rate: 0.5},
  {code: '180003', rate: 0.5},
  {code: '161715', rate: 0.5},
  {code: '501029', rate: 0.5},
  {code: '165312', rate: 0.5},
  {code: '162213', rate: 0.5},
  {code: '162412', rate: 0.5},
  {code: '160631', rate: 0.5},
  {code: '370023', rate: 0.5},
  {code: '160806', rate: 0.5},
  {code: '004643', rate: 0.5},
  {code: '163821', rate: 0.5},
  {code: '502016', rate: 0.5},
  {code: '005034', rate: 0.5},
  {code: '000313', rate: 0},
  {code: '000950', rate: 0.5,},
  {code: '519034', rate: 0.5},
  {code: '090010', rate: 0.5},
  {code: '005038', rate: 0.5},
  {code: '160418', rate: 0.5},
  {code: '257060', rate: 0.5},
  {code: '002236', rate: 0.5},
  {code: '161628', rate: 0.5},
  {code: '000975', rate: 0.5},
  {code: '310398', rate: 0.5},
  {code: '320014', rate: 0.5},
  {code: '410008', rate: 0.5},
  {code: '004193', rate: 0.5},
  {code: '161033', rate: 0.5},
  {code: '001612', rate: 0.125,},
  {code: '162307', rate: 0.5},
  {code: '163808', rate: 0.5},
  {code: '000942', rate: 0.5},
  {code: '005063', rate: 0.1},
  {code: '161032', rate: 0.6},
  {code: '110003', rate: 0.5},
  {code: '003054', rate: 0.5},
  {code: '004945', rate: 0.5},
  {code: '502030', rate: 0.5},
  {code: '000373', rate: 0.5},
  {code: '001632', rate: 0.125,},
  {code: '240016', rate: 0.5},
  {code: '502040', rate: 0.5},
  {code: '160135', rate: 0.5},
  {code: '501011', rate: 0.1},
  {code: '165520', rate: 0.5},
  {code: '502048', rate: 0.5},
  {code: '003262', rate: 0.5},
  {code: '001560', rate: 0.5},
  {code: '168204', rate: 0.7},
  {code: '001594', rate: 0.5},
  {code: '217027', rate: 0.5},
  {code: '519671', rate: 0.5},
  {code: '502003', rate: 0.5},
  {code: '399001', rate: 0.5},
  {code: '360001', rate: 0.5},
  {code: '540008', rate: 0.5},
  {code: '160136', rate: 0.5},
  {code: '163119', rate: 0.5},
  {code: '003017', rate: 0.5},
  {code: '162413', rate: 0.5},
  {code: '110026', rate: 0.5},
  {code: '162208', rate: 0.5},
  {code: '001600', rate: 0.125},
  {code: '000968', rate: 0.5},
  {code: '001630', rate: 0.125},
  {code: '001027', rate: 0.5},
  {code: '000835', rate: 0.5},
  {code: '001599', rate: 0.5},
  {code: '376510', rate: 0.5},
  {code: '501010', rate: 0.1},
  {code: '001561', rate: 0.125,},
  {code: '502010', rate: 0.5},
  {code: '162216', rate: 0.5},
  {code: '161724', rate: 0.5},
  {code: '501012', rate: 0.1},
  {code: '167503', rate: 0.5},
  {code: '004404', rate: 0.5},
  {code: '470007', rate: 0.5},
  {code: '050024', rate: 0.5},
  {code: '501036', rate: 0.1},
  {code: '001237', rate: 0.5},
  {code: '519100', rate: 0.5},
  {code: '001241', rate: 0.5},
  {code: '000596', rate: 0.5},
  {code: '004593', rate: 0.5},
  {code: '001631', rate: 0.5},
  {code: '160635', rate: 0.5},
  {code: '162510', rate: 0.5},
  {code: '163115', rate: 0.5},
  {code: '165522', rate: 0.5},
  {code: '001548', rate: 0.5},
  {code: '160222', rate: 0.7},
  {code: '168001', rate: 0.5},
  {code: '164809', rate: 0.5},
  {code: '003986', rate: 0.5},
  {code: '164402', rate: 0.5},
  {code: '005062', rate: 0.5},
  {code: '740101', rate: 0.5},
  {code: '004485', rate: 0.5},
  {code: '160633', rate: 0.5},
  {code: '165707', rate: 0.5},
  {code: '160415', rate: 0.5},
  {code: '001469', rate: 0.5},
  {code: '000711', rate: 0.2},
  {code: '501019', rate: 0.5},
  {code: '690008', rate: 0.5},
  {code: '003053', rate: 0.2},
  {code: '005112', rate: 0.5},
  {code: '160625', rate: 0.5},
  {code: '161027', rate: 0.5},
  {code: '001242', rate: 0.3},
  {code: '001593', rate: 0.125,},
  {code: '160636', rate: 0.5},
  {code: '502000', rate: 0.5},
  {code: '164820', rate: 0.7},
  {code: '164818', rate: 0.7},
  {code: '519027', rate: 0.5},
  {code: '001644', rate: 0.5},
  {code: '162010', rate: 0.5},
  {code: '164908', rate: 0.5},
  {code: '001455', rate: 0.5},
  {code: '001180', rate: 0.5},
  {code: '001214', rate: 0.25},
  {code: '340006', rate: 0.5},
  {code: '161718', rate: 0.5},
  {code: '160639', rate: 0.5},
  {code: '163118', rate: 0.5},
  {code: '161812', rate: 0.5},
  {code: '050021', rate: 0.5},
  {code: '161811', rate: 0.5},
  {code: '002510', rate: 0.5},
  {code: '002656', rate: 0.5},
  {code: '004273', rate: 0.5},
  {code: '163114', rate: 0.5},
  {code: '590007', rate: 0.5},
  {code: '002333', rate: 0.5},
  {code: '165523', rate: 0.5},
  {code: '502053', rate: 0.5},
  {code: '004070', rate: 0.125,},
  {code: '000059', rate: 0.5},
  {code: '003766', rate: 0.125},
  {code: '050013', rate: 0.5},
  {code: '002335', rate: 0.5},
  {code: '161720', rate: 0.5},
  {code: '501009', rate: 0.1},
  {code: '161123', rate: 0.5},
  {code: '003647', rate: 0.5},
  {code: '001590', rate: 0.5},
  {code: '233010', rate: 0.5},
  {code: '004195', rate: 0.5},
  {code: '110019', rate: 0.5},
  {code: '003194', rate: 0.5},
  {code: '165310', rate: 0.5},
  {code: '164401', rate: 0.5},
  {code: '162714', rate: 0.5},
  {code: '501007', rate: 0.1},
  {code: '003299', rate: 0.5},
  {code: '160634', rate: 0.5},
  {code: '161024', rate: 0.5},
  {code: '501037', rate: 0.1},
  {code: '160640', rate: 0.5},
  {code: '160219', rate: 0.5},
  {code: '160221', rate: 0.7},
  {code: '540012', rate: 0.5},
  {code: '164819', rate: 0.7},
  {code: '164821', rate: 0.7},
  {code: '530018', rate: 0.5},
  {code: '001550', rate: 0.5},
  {code: '160814', rate: 0.5},
  {code: '163109', rate: 0.5},
  {code: '002315', rate: 0.5},
  {code: '001113', rate: 0.5},
  {code: '501030', rate: 0.1},
  {code: '501031', rate: 0.1},
  {code: '217017', rate: 0.5},
  {code: '000613', rate: 0.5},
  {code: '110022', rate: 0.5},
  {code: '003623', rate: 0.5},
  {code: '166802', rate: 0.5},
  {code: '001591', rate: 0.125,},
  {code: '165519', rate: 0.5},
  {code: '162509', rate: 0.5},
  {code: '162907', rate: 0.5},
  {code: '160807', rate: 0.5},
  {code: '160517', rate: 0.5},
  {code: '001588', rate: 0.5},
  {code: '519677', rate: 0},
  {code: '540009', rate: 0.5},
  {code: '000376', rate: 0.1},
  {code: '501002', rate: 0.5},
  {code: '161629', rate: 0.5},
  {code: '519180', rate: 0.5},
  {code: '161721', rate: 0.5}];

let listU5 = [];
all.forEach(function (item) {
    listU5.push(item.code);
});

logData({
  fund: listU5
});


