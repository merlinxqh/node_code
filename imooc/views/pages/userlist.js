extends ../layout

block content
  .container
    .row
      table.table.table-hover.table-bordered
        thead
          tr
            th  电影名字
            th  录入时间
            th  查看
            th  更新
            th  删除
        tbody
          each item in users
            tr(class="item-id-#{item._id}")
              td #{item.name}
              td #{moment(item.meta.createAt).format('MM/DD/YYYY')}
              td: a(target="_blank", href="/movie/#{item._id}") 查看
              td: a(target="_blank", href="/admin/update/#{item._id}") 修改 
              td
                button.btn.btn-danger.del(type="button", data-id="#{item._id}") 删除
  // script(src="/js/admin.js")