$(document).ready(function () {  
  
    // ��ʼ��ʱ��ؼ�  
    initDateTimePicker();  
    // ��һ�β�ѯ����  
    btnQuery();  
    // ��ѯ��ť����¼�  
    $('#retrieveBtn').on('click', function () {  
        btnQuery();  
    });  
  
    // start  ����������  
    // ���鰴ť����¼�  
    $('#detailBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// ѡ�����й�ѡ  
        if (0 == selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('��ѡ��һ�����ݽ��в���');  
            $('#infoModal').modal('show');  
        } else if (1 < selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('����ѡ��������ݽ��в���');  
            $('#infoModal').modal('show');  
        } else {  
            var dataId = $(selectedCheckBoxArray[0]).attr("data-id");  
            console.log('ѡ���dataId = ' + dataId);  
            $.ajax({  
                url: '/CRUD/RetrieveById',  
                data: { id: dataId },  
                type: 'get',  
                dataType: 'json',  
                success: function (data) {  
                    if (1 == data.result) {  
                        $('#detailMoneyType').text(data.data.MoneyType);  
                        $('#detailAccountType').text(data.data.AccountType);  
                        $('#detailUrlType').text(data.data.UrlType);  
                        $('#detailEmailType').text(data.data.EmailType);  
                        $('#detailModal').modal('show');  
                    } else {  
                        $('#infoModalMsg').text(data.msg);  
                        $('#infoModal').modal('show');  
                    }  
                },  
                error: function (err) {  
                    $('#infoModalMsg').text('����������Ժ�����');  
                    $('#infoModal').modal('show');  
                }  
            });  
  
        }  
    });  
    // end  ����������  
    // start  �����������  
    // ������������  
    $('#createBtn').on('click', function () {  
        initCreateInputs();  
        initCreateStyle();  
        $('#createModal').modal('show');  
    });  
    // ����  
    $('#resetCreateBtn').on('click', function () {  
        initCreateInputs();  
        initCreateStyle();  
    });  
    // �ύ��������  
    $('#doCreateBtn').on('click', function () {  
        var createModel = new Object();  
        createModel.MoneyType = parseFloat($('#createMoneyType').val().trim());  
        createModel.AccountType = $('#createAccountType').val().trim();  
        createModel.UrlType = $('#createUrlType').val().trim();  
        createModel.EmailType = $('#createEmailType').val().trim();  
        if (validateCreateData(createModel)) {// ͨ����ǰ̨��������֤��ajax�ύ����  
            $('#createModal').modal('hide');// Ϊ�˱����ظ��ύ��modal���ص�  
            commitCreateData(createModel);  
        } else {// û��ͨ����֤,do nothing...just show those err msgs  
  
        }  
    });  
    // end  �����������  
  
    // start  �޸Ĳ������  
    // �޸İ�ť����¼�  
    $('#updateBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// ѡ�����й�ѡ  
        if (0 == selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('��ѡ��һ�����ݽ��в���');  
            $('#infoModal').modal('show');  
        } else if (1 < selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('����ѡ��������ݽ��в���');  
            $('#infoModal').modal('show');  
        } else {  
            var dataId = $(selectedCheckBoxArray[0]).attr("data-id");  
            $.ajax({  
                url: '/CRUD/RetrieveById',  
                data: { id: dataId },  
                type: 'get',  
                dataType: 'json',  
                //async: false,// ����Ϊͬ��ģʽ  
                success: function (data) {  
                    if (1 == data.result) {  
                        initUpdateStyle();  
                        $('#updateId').val(data.data.Id);  
                        $('#updateMoneyType').val(data.data.MoneyType);  
                        $('#updateAccountType').val(data.data.AccountType);  
                        $('#updateUrlType').val(data.data.UrlType);  
                        $('#updateEmailType').val(data.data.EmailType);  
                        $('#updateModal').modal('show');  
                    } else {  
                        $('#infoModalMsg').text(data.msg);  
                        $('#infoModal').modal('show');  
                    }  
                },  
                error: function (err) {  
                    $('#infoModalMsg').text('����������Ժ�����');  
                    $('#infoModal').modal('show');  
                }  
            });  
        }  
    });  
  
    // �޸�����  
    $('#resetUpdateBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// ѡ�����й�ѡ  
        var dataId = $(selectedCheckBoxArray[0]).attr("data-id");  
        $.ajax({  
            url: '/CRUD/RetrieveById',  
            data: { id: dataId },  
            type: 'get',  
            dataType: 'json',  
            success: function (data) {  
                if (1 == data.result) {  
                    initUpdateStyle();  
                    $('#updateId').val(data.data.Id);  
                    $('#updateMoneyType').val(data.data.MoneyType);  
                    $('#updateAccountType').val(data.data.AccountType);  
                    $('#updateUrlType').val(data.data.UrlType);  
                    $('#updateEmailType').val(data.data.EmailType);  
                } else {  
                    $('#updateModal').modal('hide');  
                    $('#infoModalMsg').text(data.msg);  
                    $('#infoModal').modal('show');  
                }  
            },  
            error: function (err) {  
                $('#updateModal').modal('hide');  
                $('#infoModalMsg').text('����������Ժ�����');  
                $('#infoModal').modal('show');  
            }  
        });  
    });  
  
    // ȷ���޸�  
    $('#doUpdateBtn').on('click', function () {  
        var updateModel = new Object();  
        updateModel.Id = parseInt($('#updateId').val().trim());  
        updateModel.MoneyType = parseFloat($('#updateMoneyType').val().trim());  
        updateModel.AccountType = $('#updateAccountType').val().trim();  
        updateModel.UrlType = $('#updateUrlType').val().trim();  
        updateModel.EmailType = $('#updateEmailType').val().trim();  
        if (validateUpdateData(updateModel)) {  
            $('#updateModal').modal('hide');  
            commitUpdateData(updateModel);  
        } else {  
        }  
    });  
    // end  �޸Ĳ������  
  
    // start  ɾ���������  
    //ɾ����ť����¼�  
    $('#deleteBtn').on('click', function () {  
        var selectedCheckBoxArray = $('.dataId:checked');// ѡ�����й�ѡ  
        if (0 == selectedCheckBoxArray.length) {  
            $('#infoModalMsg').text('��ѡ�����ݽ��в���');  
            $('#infoModal').modal('show');  
        } else {  
            var count = selectedCheckBoxArray.length;  
            $('#deleteConfirmMsg').text('ȷ��Ҫɾ����' + count + '��������');  
            $('#deleteConfirmModal').modal('show');  
        }  
    });  
  
    // ȷ��ɾ��  
    $('#doDeleteBtn').on('click', function () {  
        $('#deleteConfirmModal').modal('hide');//   
        var selectedCheckBoxArray = $('.dataId:checked');// ѡ�����й�ѡ  
        var dataIds = '';  
        for (var i = 0; i < selectedCheckBoxArray.length; i++) {  
            dataIds += $(selectedCheckBoxArray[i]).attr("data-id");  
            dataIds += ',';  
        }  
        dataIds = dataIds.substring(0, dataIds.length - 1);// ȥ������Ķ���  
        $.ajax({  
            url: '/CRUD/DoDelete',  
            data: { ids: dataIds },//   
            type: 'POST',  
            dataType: 'json',  
            success: function (data) {  
                $('#infoModalMsg').text(data.msg);  
                $('#infoModal').modal('show');  
                setTimeout("clearMsgAndRefreshData();", 2000);  
            },  
            error: function (err) {  
                $('#infoModalMsg').text('����������Ժ�����');  
                $('#infoModal').modal('show');  
                setTimeout("clearMsgAndRefreshData();", 2000);  
            }  
        });  
    });  
    // end  ɾ���������  
});  
  
// ��֤�޸�����   
function validateUpdateData(updateModel) {  
    var validFlag = true;  
    var updateMoneyType = updateModel.MoneyType;  
    var updateMoneyTypeExp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;// 0-99999999.99  
    if ('' == updateMoneyType) {  
        validFlag = false;  
        $('#updateMoneyTypeErrorMsg').text('�������');  
    } else if (!updateMoneyTypeExp.test(updateMoneyType)) {  
        validFlag = false;  
        $('#updateMoneyTypeErrorMsg').text('��ʽ������Ҫ��');  
    } else {  
        $('#updateMoneyTypeErrorMsg').text('');  
    }  
  
    var updateAccountType = updateModel.AccountType;  
    console.log('updateAccountType = ' + updateAccountType);  
    var updateAccountTypeExp = /^[A-Za-z]{6,20}$/;  
    if ('' == updateAccountType) {  
        validFlag = false;  
        $('#updateAccountTypeErrorMsg').text('�������');  
    } else if (!updateAccountTypeExp.test(updateAccountType)) {  
        validFlag = false;  
        $('#updateAccountTypeErrorMsg').text('��ʽ������Ҫ��');  
    }  
    else {  
        $('#updateAccountTypeErrorMsg').text('');  
    }  
  
    var updateUrlType = updateModel.UrlType;  
    var updateUrlTypeExp = /^[A-Za-z]+$/;  
    if ('' == updateUrlType) {  
        validFlag = false;  
        $('#updateUrlTypeErrorMsg').text('�������');  
    } else if (!updateUrlTypeExp.test(updateUrlType)) {  
        validFlag = false;  
        $('#updateUrlTypeErrorMsg').text('��ʽ������Ҫ��');  
    } else {  
        $('#updateUrlTypeErrorMsg').text('');  
    }  
  
    var updateEmailType = updateModel.EmailType;  
    var updateEmailTypeExp = /^.+@.+\..+$/;  
    if ('' == updateEmailType) {  
        validFlag = false;  
        $('#updateEmailTypeErrorMsg').text('�������');  
    } else if (!updateEmailTypeExp.test(updateEmailType)) {  
        validFlag = false;  
        $('#updateEmailTypeErrorMsg').text('��ʽ������Ҫ��');  
    } else {  
        $('#updateEmailTypeErrorMsg').text('');  
    }  
    return validFlag;  
}  
// �ύ�޸�����  
function commitUpdateData(updateModel) {  
    $.ajax({  
        url: '/CRUD/DoUpdate',  
        data: updateModel,// ֱ�ӽ�js object����Ϊ���������У�  
        type: 'POST',  
        dataType: 'json',  
        success: function (data) {  
            $('#infoModalMsg').text(data.msg);  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        },  
        error: function (err) {  
            $('#infoModalMsg').text('����������Ժ�����');  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        }  
    });  
}  
// �ύ��������  
function commitCreateData(createModel) {  
    $.ajax({  
        url: '/CRUD/DoCreate',  
        data: createModel,// ֱ�ӽ�js object����Ϊ���������У�  
        type: 'POST',  
        dataType: 'json',  
        success: function (data) {  
            $('#infoModalMsg').text(data.msg);  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        },  
        error: function (err) {  
            $('#infoModalMsg').text('����������Ժ�����');  
            $('#infoModal').modal('show');  
            setTimeout("clearMsgAndRefreshData();", 2000);  
        }  
    });  
}  
  
// �����ʾ��Ϣ�����¼�������  
function clearMsgAndRefreshData() {  
    $('#infoModal').modal('hide');  
    btnQuery();  
}  
// ��֤��������  
function validateCreateData(createModel) {  
    var validFlag = true;  
    var createMoneyType = createModel.MoneyType;  
    var createMoneyTypeExp = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;// 0-99999999.99  
    if ('' == createMoneyType) {  
        validFlag = false;  
        $('#createMoneyTypeErrorMsg').text('�������');  
    } else if (!createMoneyTypeExp.test(createMoneyType)) {  
        validFlag = false;  
        $('#createMoneyTypeErrorMsg').text('��ʽ������Ҫ��');  
    } else {  
        $('#createMoneyTypeErrorMsg').text('');  
    }  
  
    var createAccountType = createModel.AccountType;  
    console.log('createAccountType = ' + createAccountType);  
    var createAccountTypeExp = /^[A-Za-z]{6,20}$/;  
    if ('' == createAccountType) {  
        validFlag = false;  
        $('#createAccountTypeErrorMsg').text('�������');  
    } else if (!createAccountTypeExp.test(createAccountType)) {  
        validFlag = false;  
        $('#createAccountTypeErrorMsg').text('��ʽ������Ҫ��');  
    }  
    else {// Զ����֤  
        $.ajax({  
            url: '/CRUD/ValidCreateAccountType',  
            data: { 'createAccountType': createAccountType },  
            type: 'get',  
            dataType: 'json',  
            async: false,// ����Ϊͬ��ģʽ  
            success: function (data) {  
                if (1 == data.result) {  
                    validFlag = false;  
                    $('#createAccountTypeErrorMsg').text('���˺��Ѿ���ʹ��');  
                } else {  
                    $('#createAccountTypeErrorMsg').text('');  
                }  
            },  
            error: function (err) {  
                validFlag = false;  
                $('#createAccountTypeErrorMsg').text('���˺��Ѿ���ʹ��');  
            }  
        });  
    }  
  
    var createUrlType = createModel.UrlType;  
    var createUrlTypeExp = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;  
    if ('' == createUrlType) {  
        validFlag = false;  
        $('#createUrlTypeErrorMsg').text('�������');  
    } else if (!createUrlTypeExp.test(createUrlType)) {  
        validFlag = false;  
        $('#createUrlTypeErrorMsg').text('��ʽ������Ҫ��');  
    } else {  
        $('#createUrlTypeErrorMsg').text('');  
    }  
  
    var createEmailType = createModel.EmailType;  
    var createEmailTypeExp = /^.+@.+\..+$/;  
    if ('' == createEmailType) {  
        validFlag = false;  
        $('#createEmailTypeErrorMsg').text('�������');  
    } else if (!createEmailTypeExp.test(createEmailType)) {  
        validFlag = false;  
        $('#createEmailTypeErrorMsg').text('��ʽ������Ҫ��');  
    } else {  
        $('#createEmailTypeErrorMsg').text('');  
    }  
    return validFlag;  
}  
// ��ʼ��������������  
function initCreateInputs() {  
    $('#createMoneyType').val('');  
    $('#createAccountType').val('');  
    $('#createUrlType').val('');  
    $('#createEmailType').val('');  
}  
// ��ʼ��������ʾ��Ϣ  
function initCreateStyle() {  
    $('#createMoneyTypeErrorMsg').text('');  
    $('#createAccountTypeErrorMsg').text('');  
    $('#createUrlTypeErrorMsg').text('');  
    $('#createEmailTypeErrorMsg').text('');  
}  
// ��ʼ���޸���ʾ��Ϣ  
function initUpdateStyle() {  
    $('#updateMoneyTypeErrorMsg').text('');  
    $('#updateAccountTypeErrorMsg').text('');  
    $('#updateUrlTypeErrorMsg').text('');  
    $('#updateEmailTypeErrorMsg').text('');  
}  
// ��ҳ���ӵ����ѯ  
function pageQuery(target) {  
    var queryKey = '';  
    var sortName = 'id';  
    var sortOrder = 'asc';  
    var pageText = target.text;  
    var currentPage = '1';  
    if ('��ҳ' == pageText) {  
        currentPage = '1';  
    } else if ('ĩҳ' == pageText) {  
        currentPage = $('#totalPage').val();  
    } else {  
        currentPage = pageText;  
    }  
    var pageSize = $('#pageSize').val();  
    getAndShowData(queryKey, sortName, sortOrder, currentPage, pageSize);  
}  
// ��ť�����ѯ  
function btnQuery() {  
    var queryKey = '';  
    var sortName = 'id';  
    var sortOrder = 'asc';  
    var currentPage = $('#currentPage').val();  
    var pageSize = $('#pageSize').val();  
    getAndShowData(queryKey, sortName, sortOrder, currentPage, pageSize);  
}  
// ��ȡ����ʾ����  
function getAndShowData(queryKey, sortName, sortOrder, currentPage, pageSize) {  
    $.ajax({  
        url: '/CRUD/RetrievePageData',  
        data: { 'queryKey': queryKey, 'sortName': sortName, 'sortOrder': sortOrder, 'currentPage': currentPage, 'pageSize': pageSize },  
        type: 'GET',  
        dataType: 'json',  
        success: function (data) {  
            var trs = '';  
            if (1 == data.result) {  
                for (var i = 0; i < data.data.length; i++) {  
                    var dataId = data.data[i].Id;  
                    trs += '<tr>';  
                    trs += '<td><input type="checkbox" class="dataId" data-id="' + dataId + '"/></td>';  
                    trs += '<td>' + parseInt(i + 1) + '</td>';  
                    trs += '<td>' + dataId + '</td>';  
                    trs += '<td>' + data.data[i].MoneyType + '</td>';  
                    trs += '<td>' + data.data[i].AccountType + '</td>';  
                    trs += '<td>' + data.data[i].UrlType + '</td>';  
                    trs += '<td>' + data.data[i].EmailType + '</td>';  
                    trs += '<td>' + data.data[i].TelTyple + '</td>';  
                    trs += '<td>' + data.data[i].MobilePhoneType + '</td>';  
                    trs += '<td>' + data.data[i].IpType + '</td>';  
                    trs += '<td>' + data.data[i].QqType + '</td>';  
                    trs += '<td>' + data.data[i].IdType + '</td>';  
                    trs += '<td>' + data.data[i].PostCodeType + '</td>';  
                    trs += '</tr>';  
                }  
  
                var totalCount = data.totalCount;  
                var currentPage = data.currentPage;  
                var totalPage = data.totalPage;  
                // ��������ֵ  
                $('#totalCount').val(totalCount);  
                $('#currentPage').val(currentPage);  
                $('#totalPage').val(totalPage);  
                // ��ҳ��Ϣ��ʾ��ʾ  
                var pageInfo = '�ܹ�' + totalCount + '����¼���ܹ�' + totalPage + 'ҳ����ǰ��' + currentPage + 'ҳ';  
                $('#pageInfo').html(pageInfo);  
                // ��ҳ������Ϣ  
                var pageLinks = '';  
                pageLinks += '<li><a href="javascript:void(0);" class="pageQuery">��ҳ</a></li>';  
                for (var j = 1; j <= parseInt(totalPage) ; j++) {  
                    if (j == parseInt(currentPage)) {  
                        pageLinks += '<li class="active"><a href="javascript:void(0);" class="pageQuery">' + j + '</a></li>';  
                    } else {  
                        pageLinks += '<li><a href="javascript:void(0);" class="pageQuery">' + j + '</a></li>';  
                    }  
                }  
                pageLinks += '<li><a href="javascript:void(0);" class="pageQuery">ĩҳ</a></li>';  
                $('#pageLinks').html(pageLinks);  
                // �󶨵���¼�  
                $('.pageQuery').on('click', function () {  
                    pageQuery(this);  
                });  
            } else {  
                trs += '<tr><td colspan="13">';  
                trs += '<div class="alert alert-warning">';  
                trs += '<a href="#" class="close" data-dismiss="alert">';  
                trs += '��';  
                trs += '</a>';  
                trs += '<strong>���棡</strong>' + data.msg;  
                trs += '</div>';  
                trs += '</td></tr>';  
            }  
            $('#dataTable tbody').html(trs);  
        },  
        error: function (ex) {  
            var exTrs = '';  
            exTrs += '<tr><td colspan="13">';  
            exTrs += '<div class="alert alert-warning">';  
            exTrs += '<a href="#" class="close" data-dismiss="alert">';  
            exTrs += '��';  
            exTrs += '</a>';  
            exTrs += '<strong>���棡</strong>����������Ժ�����';  
            exTrs += '</div>';  
            exTrs += '</td></tr>';  
            $('#dataTable tbody').html(exTrs);  
        }  
    });  
}  
// ��ʼ������ʱ��ѡ��ؼ�  
function initDateTimePicker() {  
    $('#datetimepicker').datetimepicker({  
        format: 'yyyy-MM-dd hh:mm:ss',  
        language: 'zh-CN',// Ĭ�ϵġ�en������������չ�˵ĺ���js  
        pickDate: true,  
        pickTime: true,  
        hourStep: 1,  
        minuteStep: 15,  
        secondStep: 30,  
        inputMask: true  
    });  
}  