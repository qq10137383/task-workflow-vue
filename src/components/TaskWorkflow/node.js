import { Node } from 'butterfly-dag/pack';
import $ from 'jquery';

const defaultOptions = {
  icon: 'default',
  name: '',
  label: '',
  layers: [],
  enableSymbol: true,
  skipSymbol: true,
  status: 'success',
}

class BaseNode extends Node {
  constructor(opts) {
    super(opts);
    this.options = Object.assign({}, defaultOptions, opts);
  }

  draw = (opts) => {
    const { id, top, left } = opts
    const container = $('<div class="task-node-wrap"></div>')
      .attr('id', id)
      .css('top', `${top}px`)
      .css('left', `${left}px`);

    this._createNodeHeader(container);
    this._createNodeBody(container);
    this._createNodeFooter(container);
    this._addEventListeners(container);

    return container[0];
  }

  _resolveIcon(icon) {
    let image
    try {
      image = require(`./assets/images/layers/${icon}_icon.png`)
    }
    catch {
      image = require(`./assets/images/layers/default_icon.png`)
    }
    return image
  }

  _createNodeHeader(dom) {
    const { icon, name, status } = this.options
    // icon
    const elIcon = $(`<div class='task-node__icon'></div>`)
      .css('background-image', `url('${this._resolveIcon(icon)}')`)
    // title
    const elTitle = $(`<div class='task-node__title'></div>`)
      .html(name)
    // status
    const elItem = $(`<div class='task-node__status-item'></div>`)
      .addClass(`status_${status}`)
    const elStatus = $(`<div class='task-node__status'></div>`)
      .append(elItem)

    // header
    $(`<div class='task-node__header'></div>`)
      .append(elIcon)
      .append(elTitle)
      .append(elStatus)
      .appendTo(dom)
  }

  _createNodeBody(dom) {
    const { layers, label } = this.options

    // layer
    const elLabel = $(`<div class='task-node__item node__label'></div>`)
      .html(label)
      .attr('title', label)
    const elCount = $(`<div class='task-node__item node__count'></div>`)
      .html(layers.length)
    const elLayer = $(`<div class='task-node__layer'></div>`)
      .css('visibility', layers.length ? 'visible' : 'collapse')
      .append(elLabel)
      .append(elCount)

    // empty
    const elEmpty = $(
      `<div class='task-node__empty'>
           <div class='task-node__empty-title'>未添加数据图层</div>
           <div class='task-node__empty-desc'>点击编辑按钮添加图层</div>
       </div>`
    ).css('display', layers.length ? 'none' : 'block')

    // body-inner
    const elContent = $(`<div class='task-node__content-inner'></div>`)
      .append(elLayer)
      .append(elEmpty)

    //  body
    $(`<div class='task-node__content'></div>`)
      .append(elContent)
      .appendTo(dom)
  }

  _createNodeFooter(dom) {
    const { enableSymbol, skipSymbol, layers } = this.options

    // symbol
    const elEnable = $(`<div class='task-node__symbol-item enable-symbol'>已启用</div>`)
      .css('display', enableSymbol ? 'inline-block' : 'none')
    const elskip = $(`<div class='task-node__symbol-item skip-symbol'>失败跳过</div>`)
      .css('display', skipSymbol ? 'inline-block' : 'none')
    const elSymbol = $(`<div class='task-node__symbol'></div>`)
      .css('visibility', layers.length ? 'visible' : 'collapse')
      .append(elEnable)
      .append(elskip)

    //action
    const elAction = $(`<div class='task-node__action'></div>`)
    elAction.append(`<div class='task-node__action-item edit-action' data-type='edit'>编辑</div>`)
    elAction.append(`<div class='task-node__action-item delete-action' data-type='remove'>删除</div>`)

    // footer
    $(`<div class='task-node__footer'></div>`)
      .append(elSymbol)
      .append(elAction)
      .appendTo(dom)
  }

  _addEventListeners(dom) {
    dom.find('.task-node__action-item').click((e) => {
      e.stopPropagation();
      const action = e.currentTarget.getAttribute('data-type')
      this.emit('events', {
        type: `custom:${action}`,
        data: {
          id: this.id
        }
      });
    })
  }

  updateNode(data) {
    this._updateBody(data)
    this._updateFooter(data)
    this._updateEndpoints()
  }

  _updateBody(data) {
    const { label, layers } = data

    $(this.dom)
      .find('.task-node__empty')
      .css('display', layers.length ? 'none' : 'block')
      .end()
      .find('.task-node__layer')
      .css('visibility', layers.length ? 'visible' : 'collapse')
      .find('.node__label').html(label)
      .end()
      .find('.node__count').html(layers.length)
      .end()
  }

  _updateFooter(data) {
    const { layers, enableSymbol, enableSkip } = data

    $(this.dom)
      .find('.task-node__symbol')
      .css('visibility', layers.length ? 'visible' : 'collapse')
      .find('.enable-symbol')
      .css('display', enableSymbol ? 'inline-block' : 'none')
      .end()
      .find('.skip-symbol')
      .css('display', enableSkip ? 'inline-block' : 'none')
      .end()
  }

  _updateEndpoints() {
    const { endpoints } = this

    // 防止节点大小发生改变需要更新瞄点位置
    if (endpoints.length) {
      endpoints.forEach(point => point.updatePos())
      return
    }
    // 新增左右上下4个瞄点
    this.addEndpoint({
      id: "top",
      orientation: [0, -1],
      pos: [0.5, 0],
    });
    this.addEndpoint({
      id: "right",
      orientation: [1, 0],
      pos: [0, 0.5],
    });
    this.addEndpoint({
      id: "bottom",
      orientation: [0, 1],
      pos: [0.5, 0],
    });
    this.addEndpoint({
      id: "left",
      orientation: [-1, 0],
      pos: [0, 0.5],
    });
  }
}

export default BaseNode;
