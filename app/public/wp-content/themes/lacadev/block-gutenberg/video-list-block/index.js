import { registerBlockType } from '@wordpress/blocks';
import blockMeta from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';

registerBlockType( blockMeta, { edit: Edit, save } );
