<?php
/*
Template Name: One-page site
*/
?>

<?php get_header(); ?>
<?php // Let's show all the static pages!
$pages = get_pages(array('child_of' => $post->ID, 'sort_column' => 'menu_order', 'sort_order' => 'asc')); 
$count = 1;
foreach ($pages as $post) :
    setup_postdata($post);
    ?>
    <div id="<?php echo the_slug(); ?>" class="page-panel" data-slide="<?php echo $count; ?>" data-stellar-background-ratio="0.25">
    
        <div class="inner-content wrap clearfix">
            <div class="clearfix entry-content" role="main">
                <?php echo the_content(); ?>
                
                <?php if (the_slug() == "news"): ?>
                    <?php echo the_title('<h1>', '</h1>'); ?>
                    <?php get_template_part('news'); ?>
                    <div class="clearfix center">
                        <a class="button" href="/news">Read all news posts</a>
                        <a class="button" id="top-button" data-slide="1">Return to top</a>
                    </div>
                <?php endif; ?> 
            
            </div>
        </div>
        
    </div>
    
    
    
<?php endforeach; ?>
<?php wp_reset_postdata(); ?>

<canvas id="canvas"></canvas>

<?php get_footer(); ?>

