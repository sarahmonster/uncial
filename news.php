<?php
$args = array( 'posts_per_page' => 4);
$posts = get_posts( $args );
$news_count = 1;
foreach ( $posts as $post ) : setup_postdata( $post ); ?>
	<?php
		if ($news_count % 2 == 1) {
			echo '<div class="clearfix"> </div>';
			$class = "first";
		} elseif ($news_count % 2 == 0) {
			$class = "last";
		} else {
			$class = "";
		}
	?>
	<div class="news-excerpt sixcol <?php echo $class; ?> clearfix">
		<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
		<?php the_excerpt(); ?>
	</div>
<?php 
	$news_count++;
	endforeach; 
	wp_reset_postdata();
?>
