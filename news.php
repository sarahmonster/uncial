<?php
$args = array( 'posts_per_page' => 4);
$posts = get_posts( $args );
$news_count = 1;
foreach ( $posts as $post ) : setup_postdata( $post ); ?>
	<div class="news-excerpt">
        <h2><time class="updated" datetime="<?php echo get_the_time('Y-m-j'); ?>" pubdate>
            <span><?php echo get_the_time('l,'); ?></span>
            <?php echo get_the_time('F jS, Y'); ?>
        </time></h2>
        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<?php the_excerpt(); ?>
	</div>
<?php 
	$news_count++;
	endforeach; 
	wp_reset_postdata();
?>
