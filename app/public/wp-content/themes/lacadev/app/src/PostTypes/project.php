<?php

namespace App\PostTypes;

use Carbon_Fields\Container\Container;
use Carbon_Fields\Field;

class Project extends \App\Abstracts\AbstractPostType
{

    public function __construct()
    {
        $this->showThumbnailOnList = true;
        $this->supports            = [
            'title',
            'editor',
            'thumbnail',
            'excerpt',
            'page-attributes',
            'comments',
        ];

        $this->menuIcon         = 'dashicons-building';
        // $this->menuIcon = get_template_directory_uri() . '/images/custom-icon.png';
        $this->post_type        = 'project';
        $this->singularName     = $this->pluralName = __('Dự án', 'laca');
        $this->titlePlaceHolder = __('Dự án', 'laca');
        $this->slug             = 'projects';
        parent::__construct();
    }

    public function metaFields()
    {
        Container::make('post_meta', __('Thông tin dự án', 'laca'))
            ->where('post_type', '=', $this->post_type)
            ->add_fields([
                Field::make('text', 'investor', __('Chủ đầu tư', 'laca'))
                    ->set_width(33.33)
                    ->set_attribute('placeholder', 'Nhập tên chủ đầu tư'),
                Field::make('text', 'floors', __('Số tầng', 'laca'))
                    ->set_width(33.33)
                    ->set_attribute('placeholder', 'Nhập tên chủ đầu tư'),
                Field::make('text', 'location', __('Địa điểm', 'laca'))
                    ->set_width(33.33)
                    ->set_attribute('placeholder', 'Nhập địa điểm'),

                Field::make('text', 'total_area', __('Tổng diện tích', 'laca'))
                    ->set_width(33.33)
                    ->set_attribute('placeholder', 'Nhập tổng diện tích'),
                Field::make('text', 'house_area', __('Diện tích nhà', 'laca'))
                    ->set_width(33.33)
                    ->set_attribute('placeholder', 'Nhập diện tích nhà'),
                Field::make('text', 'front_area', __('Mặt tiền', 'laca'))
                    ->set_width(33.33)
                    ->set_attribute('placeholder', 'Nhập mặt tiền'),

                Field::make('text', 'execution_year', __('Năm thực hiện', 'laca'))
                    ->set_width(50)
                    ->set_attribute('placeholder', 'Nhập năm thực hiện'),
                Field::make('text', 'design_type', __('Loại thiết kế', 'laca'))
                    ->set_width(50)
                    ->set_attribute('placeholder', 'Nhập loại thiết kế'),
                Field::make('rich_text', 'usage_function', __('Công năng sử dụng', 'laca'))
                    ->set_attribute('placeholder', 'Nhập công năng sử dụng'),

                Field::make('complex', 'project_gallery', __('Thư viện ảnh dự án', 'laca'))
                    ->set_layout('tabbed-horizontal')
                    ->set_collapsed(true)
                    ->add_fields([
                        Field::make('image', 'gallery_image', __('Ảnh', 'laca'))
                            ->set_value_type('id'),
                    ]),
            ]);
    }
}
